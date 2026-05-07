import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragStateManager } from './utils/DragStateManager.js';
import { downloadExampleScenesFolder, getPosition, getQuaternion, toMujocoPos, reloadScene, reloadPolicy } from './mujocoUtils.js';
import { getSimulationThemeSettings, normalizeSimulationThemeName } from './theme.js';

const defaultPolicy = "./examples/checkpoints/g1/tracking_policy_latest.json";

/** Horizontal knockdown push magnitude (N), applied in world XY; local Z (vertical) force component is zero. */
const KNOCKDOWN_FORCE_XY_MAG = 3400;
/** Unit direction in the horizontal plane (world X/Y), MuJoCo Z-up for G1. */
const KNOCKDOWN_XY_DIR_X = 0.8191520442889918;
const KNOCKDOWN_XY_DIR_Y = -0.573576436351046;

export class MuJoCoDemo {
  constructor(mujoco) {
    this.mujoco = mujoco;
    mujoco.FS.mkdir('/working');
    mujoco.FS.mount(mujoco.MEMFS, { root: '.' }, '/working');

    this.params = {
      paused: true,
      current_motion: 'default',
      compliance_enabled: false,
      compliance_threshold: 10.0,
      cmdX: 0.0,
      cmdY: 0.0,
      cmdYaw: 0.0
    };
    this.policyRunner = null;
    this.kpPolicy = null;
    this.kdPolicy = null;
    this.actionTarget = null;
    this.model = null;
    this.data = null;
    this.simulation = null;
    this.currentPolicyPath = defaultPolicy;

    this.bodies = {};
    this.lights = {};
    this.visualThemeName = 'light';
    this.lightBaseIntensities = new Map();

    this.container = document.getElementById('mujoco-container');

    this.scene = new THREE.Scene();
    this.scene.name = 'scene';

    this.currentVisualSettings = getSimulationThemeSettings(this.visualThemeName);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / this.getViewH(), 0.001, 100);
    this.camera.name = 'PerspectiveCamera';
    this.camera.position.set(3.0, 2.2, 3.0);
    this.scene.add(this.camera);

    this.scene.background = new THREE.Color(...this.currentVisualSettings.backgroundRgb);
    this.scene.fog = null;

    this.ambientLight = new THREE.AmbientLight(0xffffff, this.currentVisualSettings.ambientIntensity);
    this.ambientLight.name = 'AmbientLight';
    this.scene.add(this.ambientLight);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderScale = 2.0;
    this.renderer.setPixelRatio(this.renderScale);
    this.renderer.setSize(window.innerWidth, this.getViewH());
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.simStepHz = 0;
    this._stepFrameCount = 0;
    this._stepLastTime = performance.now();
    this._lastRenderTime = 0;
    /** @type {number} remaining physics substeps for AMP knockdown disturbance */
    this._knockdownSubstepsRemaining = 0;

    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0.7, 0);
    this.controls.panSpeed = 2;
    this.controls.zoomSpeed = 1;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.10;
    this.controls.screenSpacePanning = true;
    this.controls.update();

    window.addEventListener('resize', this.onWindowResize.bind(this));

    this.dragStateManager = new DragStateManager(this.scene, this.renderer, this.camera, this.container.parentElement, this.controls);

    this.followEnabled = false;
    this.followHeight = 0.75;
    this.followLerp = 0.05;
    this.followTarget = new THREE.Vector3();
    this.followTargetDesired = new THREE.Vector3();
    this.followDelta = new THREE.Vector3();
    this.followOffset = new THREE.Vector3();
    this.followInitialized = false;
    this.followBodyId = null;
    this.followDistance = this.camera.position.distanceTo(this.controls.target);

    this.lastSimState = {
      bodies: new Map(),
      lights: new Map(),
      tendons: {
        numWraps: 0,
        matrix: new THREE.Matrix4()
      }
    };

    this.renderer.setAnimationLoop(this.render.bind(this));

    this.reloadScene = reloadScene.bind(this);
    this.reloadPolicy = reloadPolicy.bind(this);
  }

  async init() {
    await downloadExampleScenesFolder(this.mujoco);
    await this.reloadScene('g1/g1.xml');
    this.updateFollowBodyId();
    await this.reloadPolicy(defaultPolicy);
    this.alive = true;
  }

  async reload(mjcf_path) {
    await this.reloadScene(mjcf_path);
    this.updateFollowBodyId();
    this.timestep = this.model.opt.timestep;
    this.decimation = Math.max(1, Math.round(0.02 / this.timestep));

    await this.reloadPolicy(this.currentPolicyPath ?? defaultPolicy);
    console.log('timestep:', this.timestep, 'decimation:', this.decimation);
    this.alive = true;
  }

  setFollowEnabled(enabled) {
    this.followEnabled = Boolean(enabled);
    this.followInitialized = false;
    if (this.followEnabled) {
      this.followOffset.subVectors(this.camera.position, this.controls.target);
      if (this.followOffset.lengthSq() === 0) {
        this.followOffset.set(0, 0, 1);
      }
      this.followOffset.setLength(this.followDistance);
      this.camera.position.copy(this.controls.target).add(this.followOffset);
      this.controls.update();
    }
  }

  setVisualTheme(name) {
    this.visualThemeName = normalizeSimulationThemeName(name);
    this.currentVisualSettings = getSimulationThemeSettings(this.visualThemeName);
    this.applyVisualTheme();
  }

  applyVisualTheme() {
    if (!this.currentVisualSettings) {
      return;
    }

    if (this.scene?.background) {
      this.scene.background.setRGB(...this.currentVisualSettings.backgroundRgb);
    } else if (this.scene) {
      this.scene.background = new THREE.Color(...this.currentVisualSettings.backgroundRgb);
    }

    if (this.ambientLight) {
      this.ambientLight.intensity = this.currentVisualSettings.ambientIntensity;
    }

    for (const [index, light] of Object.entries(this.lights ?? {})) {
      if (!light) {
        continue;
      }
      const lightIndex = Number(index);
      const baseIntensity = this.lightBaseIntensities.get(lightIndex) ?? light.intensity ?? 1;
      this.lightBaseIntensities.set(lightIndex, baseIntensity);
      light.intensity = baseIntensity * this.currentVisualSettings.lightIntensityScale;
    }
  }

  updateFollowBodyId() {
    if (Number.isInteger(this.pelvis_body_id)) {
      this.followBodyId = this.pelvis_body_id;
      return;
    }
    if (this.model && this.model.nbody > 1) {
      this.followBodyId = 1;
    }
  }

  updateCameraFollow() {
    if (!this.followEnabled) {
      return;
    }
    const bodyId = Number.isInteger(this.followBodyId) ? this.followBodyId : null;
    if (bodyId === null) {
      return;
    }
    const cached = this.lastSimState.bodies.get(bodyId);
    if (!cached) {
      return;
    }
    this.followTargetDesired.set(cached.position.x, this.followHeight, cached.position.z);
    if (!this.followInitialized) {
      this.followTarget.copy(this.followTargetDesired);
      this.followInitialized = true;
    } else {
      this.followTarget.lerp(this.followTargetDesired, this.followLerp);
    }

    this.followDelta.subVectors(this.followTarget, this.controls.target);
    this.controls.target.copy(this.followTarget);
    this.camera.position.add(this.followDelta);
  }

  applyJointPositionControl() {
    for (let i = 0; i < this.numActions; i++) {
      const qpos_adr = this.qpos_adr_policy[i];
      const qvel_adr = this.qvel_adr_policy[i];
      const ctrl_adr = this.ctrl_adr_policy[i];

      const targetJpos = this.actionTarget ? this.actionTarget[i] : 0.0;
      const kp = this.kpPolicy ? this.kpPolicy[i] : 0.0;
      const kd = this.kdPolicy ? this.kdPolicy[i] : 0.0;
      const torque = kp * (targetJpos - this.simulation.qpos[qpos_adr]) + kd * (0 - this.simulation.qvel[qvel_adr]);
      let ctrlValue = torque;
      const ctrlRange = this.model?.actuator_ctrlrange;
      if (ctrlRange && ctrlRange.length >= (ctrl_adr + 1) * 2) {
        const min = ctrlRange[ctrl_adr * 2];
        const max = ctrlRange[(ctrl_adr * 2) + 1];
        if (Number.isFinite(min) && Number.isFinite(max) && min < max) {
          ctrlValue = Math.min(Math.max(ctrlValue, min), max);
        }
      }
      this.simulation.ctrl[ctrl_adr] = ctrlValue;
    }
  }

  applyUnitreePositionControl() {
    for (let i = 0; i < this.numActions; i++) {
      const qpos_adr = this.qpos_adr_policy[i];
      const qvel_adr = this.qvel_adr_policy[i];
      const ctrl_adr = this.ctrl_adr_policy[i];

      const targetJpos = this.actionTarget ? this.actionTarget[i] : 0.0;
      const kp = this.kpPolicy ? this.kpPolicy[i] : 0.0;
      const kd = this.kdPolicy ? this.kdPolicy[i] : 0.0;
      const qpos = this.simulation.qpos[qpos_adr];
      const qvel = this.simulation.qvel[qvel_adr];
      let torque = kp * (targetJpos - qpos) + kd * (0 - qvel);
      const sameDirection = qvel * torque > 0;
      const y1 = this.Y1Policy ? this.Y1Policy[i] : Infinity;
      const y2 = this.Y2Policy ? this.Y2Policy[i] : y1;
      const effortLimit = this.effortLimitPolicy ? this.effortLimitPolicy[i] : Infinity;
      let maxEffort = Math.min(sameDirection ? y1 : y2, effortLimit);
      const x1 = this.X1Policy ? this.X1Policy[i] : Infinity;
      const x2 = this.X2Policy ? this.X2Policy[i] : Infinity;
      const absVel = Math.abs(qvel);
      if (Number.isFinite(x1) && Number.isFinite(x2) && absVel >= x1) {
        const denom = Math.max(x2 - x1, 1e-6);
        maxEffort = Math.max((-maxEffort / denom) * (absVel - x1) + maxEffort, 0.0);
      }
      torque = Math.max(-maxEffort, Math.min(maxEffort, torque));
      const fs = this.frictionStaticPolicy ? this.frictionStaticPolicy[i] : 0.0;
      const fd = this.frictionDynamicPolicy ? this.frictionDynamicPolicy[i] : 0.0;
      const va = this.frictionActivationVelPolicy ? Math.max(this.frictionActivationVelPolicy[i], 1e-6) : 0.01;
      torque -= fs * Math.tanh(qvel / va) + fd * qvel;

      let ctrlValue = torque;
      const ctrlRange = this.model?.actuator_ctrlrange;
      if (ctrlRange && ctrlRange.length >= (ctrl_adr + 1) * 2) {
        const min = ctrlRange[ctrl_adr * 2];
        const max = ctrlRange[(ctrl_adr * 2) + 1];
        if (Number.isFinite(min) && Number.isFinite(max) && min < max) {
          ctrlValue = Math.min(Math.max(ctrlValue, min), max);
        }
      }
      this.simulation.ctrl[ctrl_adr] = ctrlValue;
    }
  }

  async main_loop() {
    if (!this.policyRunner) {
      return;
    }

    while (this.alive) {
      const loopStart = performance.now();

      if (!this.params.paused && this.model && this.data && this.simulation && this.policyRunner) {
        const state = this.readPolicyState();

        try {
          this.actionTarget = await this.policyRunner.step(state);
        } catch (e) {
          console.error('Inference error in main loop:', e);
          this.alive = false;
          break;
        }

        for (let substep = 0; substep < this.decimation; substep++) {
          if (this.control_type === 'joint_position') {
            this.applyJointPositionControl();
          } else if (this.control_type === 'unitree_position') {
            this.applyUnitreePositionControl();
          } else if (this.control_type === 'torque') {
            console.error('Torque control not implemented yet.');
          }

          const applied = this.simulation.qfrc_applied;
          for (let i = 0; i < applied.length; i++) {
            applied[i] = 0.0;
          }

          if (this._knockdownSubstepsRemaining > 0) {
            this.applyPelvisKnockdownForceXYPlane();
            this._knockdownSubstepsRemaining -= 1;
          }

          const dragged = this.dragStateManager.physicsObject;
          if (dragged && dragged.bodyID) {
            for (let b = 0; b < this.model.nbody; b++) {
              if (this.bodies[b]) {
                getPosition(this.simulation.xpos, b, this.bodies[b].position);
                getQuaternion(this.simulation.xquat, b, this.bodies[b].quaternion);
                this.bodies[b].updateWorldMatrix();
              }
            }
            const bodyID = dragged.bodyID;
            this.dragStateManager.update();
            const force = toMujocoPos(
              this.dragStateManager.currentWorld.clone()
                .sub(this.dragStateManager.worldHit)
                .multiplyScalar(60.0)
            );
            // clamp force magnitude
            const forceMagnitude = Math.sqrt(force.x * force.x + force.y * force.y + force.z * force.z);
            const maxForce = 30.0;
            if (forceMagnitude > maxForce) {
              const scale = maxForce / forceMagnitude;
              force.x *= scale;
              force.y *= scale;
              force.z *= scale;
            }
            const point = toMujocoPos(this.dragStateManager.worldHit.clone());
            this.simulation.applyForce(force.x, force.y, force.z, 0, 0, 0, point.x, point.y, point.z, bodyID);
          }

          this.simulation.step();
        }

        for (let b = 0; b < this.model.nbody; b++) {
          if (!this.bodies[b]) {
            continue;
          }
          if (!this.lastSimState.bodies.has(b)) {
            this.lastSimState.bodies.set(b, {
              position: new THREE.Vector3(),
              quaternion: new THREE.Quaternion()
            });
          }
          const cached = this.lastSimState.bodies.get(b);
          getPosition(this.simulation.xpos, b, cached.position);
          getQuaternion(this.simulation.xquat, b, cached.quaternion);
        }

        const numLights = this.model.nlight;
        for (let l = 0; l < numLights; l++) {
          if (!this.lights[l]) {
            continue;
          }
          if (!this.lastSimState.lights.has(l)) {
            this.lastSimState.lights.set(l, {
              position: new THREE.Vector3(),
              direction: new THREE.Vector3()
            });
          }
          const cached = this.lastSimState.lights.get(l);
          getPosition(this.simulation.light_xpos, l, cached.position);
          getPosition(this.simulation.light_xdir, l, cached.direction);
        }

        this.lastSimState.tendons.numWraps = {
          count: this.model.nwrap,
          matrix: this.lastSimState.tendons.matrix
        };

        this._stepFrameCount += 1;
        const now = performance.now();
        const elapsedStep = now - this._stepLastTime;
        if (elapsedStep >= 500) {
          this.simStepHz = (this._stepFrameCount * 1000) / elapsedStep;
          this._stepFrameCount = 0;
          this._stepLastTime = now;
        }
      } else {
        this.simStepHz = 0;
        this._stepFrameCount = 0;
        this._stepLastTime = performance.now();
      }

      const loopEnd = performance.now();
      const elapsed = (loopEnd - loopStart) / 1000;
      const target = this.timestep * this.decimation;
      const sleepTime = Math.max(0, target - elapsed);
      await new Promise((resolve) => setTimeout(resolve, sleepTime * 1000));
    }
  }

  getViewH() {
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 58;
    return window.innerHeight - headerH;
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / this.getViewH();
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(this.renderScale);
    this.renderer.setSize(window.innerWidth, this.getViewH());
    this._lastRenderTime = 0;
    this.render();
  }

  setRenderScale(scale) {
    const clamped = Math.max(0.5, Math.min(2.0, scale));
    this.renderScale = clamped;
    this.renderer.setPixelRatio(this.renderScale);
    this.renderer.setSize(window.innerWidth, this.getViewH());
    this._lastRenderTime = 0;
    this.render();
  }

  getSimStepHz() {
    return this.simStepHz;
  }

  /**
   * Queue several physics substeps of large wrench on the pelvis (AMP-only UI)
   * to knock the robot down for get-up / recovery testing.
   */
  queueKnockdownDisturbance() {
    if (!this.simulation || !this.model) {
      return;
    }
    this._knockdownSubstepsRemaining = 14;
  }

  /**
   * Floating-base pelvis id for wrenches (never world body 0).
   */
  resolvePelvisBodyId() {
    const map = this.bodyIdByName;
    if (map && Number.isInteger(map.pelvis) && map.pelvis > 0) {
      return map.pelvis;
    }
    if (map && Number.isInteger(map.base) && map.base > 0) {
      return map.base;
    }
    if (Number.isInteger(this.pelvis_body_id) && this.pelvis_body_id > 0) {
      return this.pelvis_body_id;
    }
    if (Number.isInteger(this.followBodyId) && this.followBodyId > 0) {
      return this.followBodyId;
    }
    return 1;
  }

  /**
   * Applies a horizontal-only force on the pelvis at its current body origin (world xpos).
   * Does not modify qpos — disturbance is purely physical (mj_applyFT).
   */
  applyPelvisKnockdownForceXYPlane() {
    const bodyId = this.resolvePelvisBodyId();
    if (!Number.isInteger(bodyId) || bodyId < 1) {
      return;
    }
    const xp = this.simulation.xpos;
    const idx = bodyId * 3;
    const px = xp[idx];
    const py = xp[idx + 1];
    const pz = xp[idx + 2];
    const fx = KNOCKDOWN_FORCE_XY_MAG * KNOCKDOWN_XY_DIR_X;
    const fy = KNOCKDOWN_FORCE_XY_MAG * KNOCKDOWN_XY_DIR_Y;
    const fz = 0;
    this.simulation.applyForce(fx, fy, fz, 0, 0, 0, px, py, pz, bodyId);
  }

  readPolicyState() {
    const qpos = this.simulation.qpos;
    const qvel = this.simulation.qvel;
    const jointPos = new Float32Array(this.numActions);
    const jointVel = new Float32Array(this.numActions);
    for (let i = 0; i < this.numActions; i++) {
      const qposAdr = this.qpos_adr_policy[i];
      const qvelAdr = this.qvel_adr_policy[i];
      jointPos[i] = qpos[qposAdr];
      jointVel[i] = qvel[qvelAdr];
    }
    const rootPos = new Float32Array([qpos[0], qpos[1], qpos[2]]);
    const rootQuat = new Float32Array([qpos[3], qpos[4], qpos[5], qpos[6]]);
    const rootAngVel = new Float32Array([qvel[3], qvel[4], qvel[5]]);
    const complianceEnabled = Boolean(this.params?.compliance_enabled);
    const rawThreshold = Number(this.params?.compliance_threshold);
    const complianceThreshold = Number.isFinite(rawThreshold) ? rawThreshold : 10.0;
    return {
      jointPos,
      jointVel,
      rootPos,
      rootQuat,
      rootAngVel,
      complianceEnabled,
      complianceThreshold,
      qvel_base: rootAngVel,
      cmd: [this.params.cmdX, this.params.cmdY, this.params.cmdYaw]
    };
  }

  applyPolicyInitialState() {
    const initialState = this.policyInitialState;
    if (!initialState || !this.simulation || !this.qpos_adr_policy) {
      return;
    }

    const rootPos = initialState.root_pos;
    if (Array.isArray(rootPos) && rootPos.length >= 3) {
      this.simulation.qpos[0] = Number(rootPos[0]) || 0.0;
      this.simulation.qpos[1] = Number(rootPos[1]) || 0.0;
      this.simulation.qpos[2] = Number(rootPos[2]) || 0.0;
    }

    const rootQuat = initialState.root_quat;
    if (Array.isArray(rootQuat) && rootQuat.length >= 4) {
      this.simulation.qpos[3] = Number(rootQuat[0]) || 1.0;
      this.simulation.qpos[4] = Number(rootQuat[1]) || 0.0;
      this.simulation.qpos[5] = Number(rootQuat[2]) || 0.0;
      this.simulation.qpos[6] = Number(rootQuat[3]) || 0.0;
    }

    const jointPosArray = initialState.joint_pos_array;
    if (Array.isArray(jointPosArray) && jointPosArray.length === this.numActions) {
      for (let i = 0; i < this.numActions; i++) {
        this.simulation.qpos[this.qpos_adr_policy[i]] = Number(jointPosArray[i]) || 0.0;
      }
    } else {
      const jointRules = initialState.joint_pos ?? {};
      for (let i = 0; i < this.numActions; i++) {
        const jointName = this.policyJointNames[i];
        for (const [pattern, value] of Object.entries(jointRules)) {
          const regex = new RegExp(`^${pattern}$`);
          if (regex.test(jointName)) {
            this.simulation.qpos[this.qpos_adr_policy[i]] = Number(value) || 0.0;
          }
        }
      }
    }

    for (let i = 0; i < this.simulation.qvel.length; i++) {
      this.simulation.qvel[i] = 0.0;
    }
    this.simulation.forward();
  }

  resetSimulation() {
    if (!this.simulation) {
      return;
    }
    this._knockdownSubstepsRemaining = 0;
    this.params.paused = true;
    this.simulation.resetData();
    this.applyPolicyInitialState();
    this.simulation.forward();
    this.actionTarget = null;
    if (this.policyRunner) {
      const state = this.readPolicyState();
      this.policyRunner.reset(state);
      this.params.current_motion = 'default';
    }
    this.params.paused = false;
  }

  render() {
    if (!this.model || !this.data || !this.simulation) {
      return;
    }
    const now = performance.now();
    if (now - this._lastRenderTime < 30) {
      return;
    }
    this._lastRenderTime = now;

    this.updateCameraFollow();
    this.controls.update();

    for (const [b, cached] of this.lastSimState.bodies) {
      if (this.bodies[b]) {
        this.bodies[b].position.copy(cached.position);
        this.bodies[b].quaternion.copy(cached.quaternion);
        this.bodies[b].updateWorldMatrix();
      }
    }

    for (const [l, cached] of this.lastSimState.lights) {
      if (this.lights[l]) {
        this.lights[l].position.copy(cached.position);
        this.lights[l].lookAt(cached.direction.clone().add(this.lights[l].position));
      }
    }

    if (this.mujocoRoot && this.mujocoRoot.cylinders) {
      const numWraps = this.lastSimState.tendons.numWraps.count;
      this.mujocoRoot.cylinders.count = numWraps;
      this.mujocoRoot.spheres.count = numWraps > 0 ? numWraps + 1 : 0;
      this.mujocoRoot.cylinders.instanceMatrix.needsUpdate = true;
      this.mujocoRoot.spheres.instanceMatrix.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
