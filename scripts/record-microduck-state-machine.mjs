#!/usr/bin/env node
/**
 * Record the Microduck state machine: the Policy dropdown keeps a single
 * "Microduck" entry, and the walk / stand / sit-stand / roulade policies are
 * switched by the state-machine buttons in the control panel and next to the
 * mobile joystick. The joystick itself drives the walking command.
 *
 * 无 GPU 的机器上软件光栅化只有 1~2 fps，实时录屏几乎看不到动作。
 * 这里改成「按仿真时间取帧」：关闭渲染循环让物理跑到 50Hz，每推进固定的
 * 仿真步数就暂停、渲染一帧并截图，最后按同样的帧率编码，得到接近实时的演示。
 *
 * Usage:
 *   VITE_URL=http://127.0.0.1:3000/ node scripts/record-microduck-state-machine.mjs
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3000/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const FFMPEG = process.env.FFMPEG_PATH ?? 'ffmpeg';
const OUT_DIR = process.env.VIDEO_DIR ?? '/opt/cursor/artifacts';
const MAX_LOAD_MS = Number(process.env.SCREENSHOT_MAX_LOAD_MS ?? 240000);
const OUT_WEBM = path.join(OUT_DIR, 'microduck_state_machine.webm');
const OUT_MP4 = path.join(OUT_DIR, 'microduck_state_machine.mp4');
const SHOT_DROPDOWN = path.join(OUT_DIR, 'microduck_policy_dropdown_open.png');
const SHOT_PANEL = path.join(OUT_DIR, 'microduck_state_machine_panel.png');

/** 每帧推进的策略步数；策略步长 = timestep * decimation = 20ms，2 步 = 40ms = 25fps。 */
const STEPS_PER_FRAME = 2;
const FPS = 25;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function encodeVideo(frameDir, outPath, codecArgs) {
  const result = spawnSync(
    FFMPEG,
    [
      '-y',
      '-framerate', String(FPS),
      '-i', path.join(frameDir, 'frame_%05d.jpg'),
      ...codecArgs,
      outPath
    ],
    { encoding: 'utf8' }
  );
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${outPath}: ${result.stderr}`);
  }
}

const FIND_DEMO_PROXY = `() => {
  const app = document.querySelector('#app')?.__vue_app__;
  // app._instance 只在 dev 构建里挂载，生产构建退回容器 vnode。
  const root = app?._instance ?? app?._container?._vnode?.component;
  const stack = root ? [root] : [];
  while (stack.length) {
    const comp = stack.pop();
    if (!comp) continue;
    if (comp.proxy?.demo?.simulation?.qpos) return comp.proxy;
    const queue = comp.subTree ? [comp.subTree] : [];
    while (queue.length) {
      const vnode = queue.pop();
      if (!vnode) continue;
      if (vnode.component) stack.push(vnode.component);
      if (Array.isArray(vnode.children)) {
        for (const child of vnode.children) queue.push(child);
      }
    }
  }
  return null;
}`;

async function withProxy(page, fn, ...args) {
  return page.evaluate(
    (findDemoSrc, fnSrc, fnArgs) => {
      const proxy = eval(findDemoSrc)();
      return eval(fnSrc)(proxy, ...fnArgs);
    },
    FIND_DEMO_PROXY,
    fn.toString(),
    args
  );
}

async function waitForPolicyReady(page) {
  await page.waitForFunction(
    () => {
      const dialogText = document.querySelector('.v-dialog')?.textContent ?? '';
      const loadingVisible = /Loading Simulation|正在加载仿真环境/.test(dialogText);
      const errorDialog = /Unexpected runtime error|发生意外运行时错误/.test(dialogText);
      const policySelect = document.querySelector('[data-test="policy-select"]')
        ?? document.querySelector('.controls-card .v-select input');
      const policyReady = policySelect
        && !policySelect.closest('.v-input')?.classList?.contains?.('v-input--disabled');
      const bodyHasError = /Unexpected runtime error|发生意外运行时错误/.test(document.body.innerText ?? '');
      return !loadingVisible && !errorDialog && !bodyHasError && policyReady;
    },
    { timeout: MAX_LOAD_MS, polling: 400 }
  );
}

async function currentPolicyTitle(page) {
  return page.evaluate(() => {
    const selection = document.querySelector('.controls-card .v-select .v-select__selection-text');
    return selection?.textContent?.trim() ?? '';
  });
}

async function readRobotSnapshot(page) {
  return withProxy(page, (proxy) => {
    if (!proxy) {
      return null;
    }
    const qpos = proxy.demo.simulation.qpos;
    return {
      policy: proxy.currentPolicy,
      state: proxy.microduckState,
      cmdX: proxy.cmdX,
      sit: Boolean(proxy.microduckSitMode),
      hz: Number(proxy.demo.simStepHz) || 0,
      steps: Number(proxy.demo.policyRunner?.stepCount) || 0,
      x: Number(qpos[0]) || 0,
      y: Number(qpos[1]) || 0,
      z: Number(qpos[2]) || 0
    };
  });
}

function logSnap(label, snap) {
  if (!snap) {
    console.log(`${label}: (no demo)`);
    return;
  }
  console.log(
    `${label}: policy=${snap.policy} state=${snap.state} cmdX=${snap.cmdX.toFixed(2)} sit=${snap.sit}`
    + ` xyz=(${snap.x.toFixed(3)},${snap.y.toFixed(3)},${snap.z.toFixed(3)})`
    + ` hz=${snap.hz.toFixed(1)} steps=${snap.steps}`
  );
}

/** 关闭 three.js 渲染循环，把主线程让给物理与推理（软件光栅化下能从 0.7Hz 提到 50Hz）。 */
async function enterCaptureMode(page) {
  await withProxy(page, (proxy) => {
    proxy.demo.renderer.setAnimationLoop(null);
  });
}

async function leaveCaptureMode(page) {
  await withProxy(page, (proxy) => {
    proxy.demo.params.paused = false;
    proxy.demo.renderer.setAnimationLoop(proxy.demo.render.bind(proxy.demo));
  });
}

async function setSimPaused(page, paused) {
  await withProxy(page, (proxy, value) => {
    proxy.demo.params.paused = value;
  }, paused);
}

/** 推进固定的策略步数（仿真时间），推进完成后重新暂停。 */
async function advanceSimSteps(page, steps) {
  await withProxy(page, async (proxy, wanted) => {
    const demo = proxy.demo;
    const runner = demo.policyRunner;
    const target = (runner?.stepCount ?? 0) + wanted;
    demo.params.paused = false;
    const deadline = performance.now() + 5000;
    while ((demo.policyRunner?.stepCount ?? target) < target && performance.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 4));
    }
    demo.params.paused = true;
  }, steps);
}

class FrameSink {
  constructor(page, frameDir) {
    this.page = page;
    this.frameDir = frameDir;
    this.count = 0;
  }

  async capture() {
    // 渲染循环已关闭，取帧前手动渲染一次，保证画布是当前仿真状态。
    await withProxy(this.page, (proxy) => {
      proxy.demo._lastRenderTime = 0;
      proxy.demo.render();
    });
    const dest = path.join(this.frameDir, `frame_${String(this.count).padStart(5, '0')}.jpg`);
    await this.page.screenshot({ path: dest, type: 'jpeg', quality: 80 });
    this.count += 1;
  }

  /** 按仿真时间取帧：每帧推进 STEPS_PER_FRAME 步再截图。 */
  async captureSimSeconds(seconds) {
    const frames = Math.max(1, Math.round(seconds * FPS));
    for (let i = 0; i < frames; i++) {
      await advanceSimSteps(this.page, STEPS_PER_FRAME);
      await this.capture();
    }
  }

  /** 策略热切换期间按墙钟取帧，让视频里能看到加载对话框与按钮状态。 */
  async captureUntil(predicate, { maxFrames = 60 } = {}) {
    for (let i = 0; i < maxFrames; i++) {
      await this.capture();
      if (await predicate()) {
        return true;
      }
      await sleep(150);
    }
    return false;
  }
}

async function openPolicyMenu(page) {
  await page.keyboard.press('Escape');
  await sleep(150);
  await page.evaluate(() => {
    document.querySelector('.controls-card .v-select .v-field')?.scrollIntoView({ block: 'center' });
  });
  await sleep(200);
  await page.click('.controls-card .v-select .v-field');
  await page.waitForSelector('.v-overlay-container .v-list-item', { timeout: 15000 });
  await sleep(250);
}

async function clickPolicyItem(page, title) {
  const clicked = await page.evaluate((wanted) => {
    const items = [...document.querySelectorAll('.v-overlay-container .v-list-item')];
    const match = items.find((el) => (el.textContent ?? '').trim() === wanted);
    match?.click();
    return Boolean(match);
  }, title);
  if (!clicked) {
    throw new Error(`Could not find policy "${title}"`);
  }
  await page.waitForFunction(
    () => !document.querySelector('.v-overlay-container .v-list'),
    { timeout: 8000 }
  );
  await waitForPolicyReady(page);
  await page.evaluate(() => document.activeElement?.blur?.());
}

function stateSelector(stateValue) {
  return `[data-test="microduck-state-${stateValue}"]`;
}

function joystickStateSelector(stateValue) {
  return `[data-test="microduck-joystick-state-${stateValue}"]`;
}

async function elementCenter(page, selector) {
  const box = await page.evaluate((sel) => {
    const rect = document.querySelector(sel)?.getBoundingClientRect();
    return rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null;
  }, selector);
  if (!box) {
    throw new Error(`Element not found: ${selector}`);
  }
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

/** Push the mobile joystick and keep it held; the caller releases it. */
async function holdJoystick(page, offsetX, offsetY) {
  const center = await elementCenter(page, '.amp-mobile-controls__stick-base');
  await page.mouse.move(center.x, center.y);
  await page.mouse.down();
  await page.mouse.move(center.x + offsetX, center.y + offsetY, { steps: 6 });
}

async function releaseJoystick(page) {
  await page.mouse.up();
}

async function isMicroduckStateSettled(page, stateValue) {
  return page.evaluate((sel) => {
    const btn = document.querySelector(sel);
    const dialogText = document.querySelector('.v-dialog')?.textContent ?? '';
    const loading = /Loading Simulation|正在加载仿真环境/.test(dialogText);
    return Boolean(btn) && btn.getAttribute('aria-pressed') === 'true' && !btn.disabled && !loading;
  }, stateSelector(stateValue));
}

/** 点摇杆旁的状态机按钮切换策略，切换过程中继续取帧。 */
async function switchState(page, sink, stateValue) {
  await setSimPaused(page, false);
  const selector = joystickStateSelector(stateValue);
  await page.waitForFunction(
    (sel) => {
      const btn = document.querySelector(sel);
      return Boolean(btn) && !btn.disabled;
    },
    { timeout: 60000 },
    selector
  );
  await page.click(selector);
  const settled = await sink.captureUntil(() => isMicroduckStateSettled(page, stateValue), { maxFrames: 80 });
  if (!settled) {
    throw new Error(`Microduck state "${stateValue}" did not settle`);
  }
  // 面板与摇杆两处按钮应指向同一个状态。
  const joystickPressed = await page.evaluate(
    (sel) => document.querySelector(sel)?.getAttribute('aria-pressed') === 'true',
    selector
  );
  if (!joystickPressed) {
    throw new Error(`Joystick button for "${stateValue}" is not marked active`);
  }
  await page.evaluate(() => document.activeElement?.blur?.());
  await setSimPaused(page, true);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const frameDir = mkdtempSync(path.join(tmpdir(), 'microduck-frames-'));
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  const sink = new FrameSink(page, frameDir);

  try {
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await waitForPolicyReady(page);
    await sleep(400);

    // Policy 下拉栏里 Microduck 只有一个选项，选中后进入默认的 walk 状态。
    await openPolicyMenu(page);
    await sleep(800);
    await page.screenshot({ path: SHOT_DROPDOWN, type: 'png' });
    const microduckItems = await page.evaluate(() =>
      [...document.querySelectorAll('.v-overlay-container .v-list-item')]
        .map((el) => (el.textContent ?? '').trim())
        .filter((text) => text.toLowerCase().includes('microduck')));
    if (microduckItems.length !== 1 || microduckItems[0] !== 'Microduck') {
      throw new Error(`Expected exactly one "Microduck" dropdown entry, got: ${JSON.stringify(microduckItems)}`);
    }
    await clickPolicyItem(page, 'Microduck');
    const title = await currentPolicyTitle(page);
    if (title !== 'Microduck') {
      throw new Error(`Expected the dropdown to show "Microduck", got: ${title}`);
    }
    await page.waitForSelector(stateSelector('walk'), { timeout: 60000 });
    await sleep(800);
    await page.screenshot({ path: SHOT_PANEL, type: 'png' });
    logSnap('after-select', await readRobotSnapshot(page));

    await enterCaptureMode(page);
    await setSimPaused(page, true);

    // 1) walk：推摇杆前进（略带左转）
    await holdJoystick(page, -22, -46);
    await sink.captureSimSeconds(3.5);
    await releaseJoystick(page);
    await sink.captureSimSeconds(0.6);
    logSnap('after-walk-joystick', await readRobotSnapshot(page));

    // 2) 状态机按钮 -> stand
    await switchState(page, sink, 'stand');
    await sink.captureSimSeconds(1.5);
    logSnap('after-stand', await readRobotSnapshot(page));

    // 3) 状态机按钮 -> sitstand；再次点同一个摇杆按钮翻转坐/站姿态
    await switchState(page, sink, 'sitstand');
    await sink.captureSimSeconds(1);
    await setSimPaused(page, false);
    await page.click(joystickStateSelector('sitstand'));
    await setSimPaused(page, true);
    await sink.captureSimSeconds(2.5);
    logSnap('after-sit', await readRobotSnapshot(page));
    await setSimPaused(page, false);
    await page.click('[data-test="microduck-sit-toggle"]');
    await setSimPaused(page, true);
    await sink.captureSimSeconds(2);
    logSnap('after-stand-up', await readRobotSnapshot(page));

    // 4) 状态机按钮 -> roulade，按仿真时间滚完后状态机自动切回 walk
    await switchState(page, sink, 'roulade');
    for (let i = 0; i < 60; i++) {
      await sink.captureSimSeconds(0.4);
      if (await isMicroduckStateSettled(page, 'walk')) {
        break;
      }
    }
    logSnap('after-roulade', await readRobotSnapshot(page));
    if (!(await isMicroduckStateSettled(page, 'walk'))) {
      throw new Error('Roulade did not auto-return to walk');
    }
    await sink.captureSimSeconds(1.5);
    logSnap('after-auto-walk', await readRobotSnapshot(page));

    await leaveCaptureMode(page);

    const fatal = errs.filter((e) => !e.includes('ResizeObserver'));
    if (fatal.length) {
      throw new Error(`Page errors: ${fatal.join(' | ')}`);
    }
    if (sink.count < 100) {
      throw new Error(`Too few frames captured: ${sink.count}`);
    }

    encodeVideo(frameDir, OUT_WEBM, ['-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', '-pix_fmt', 'yuv420p', '-auto-alt-ref', '0']);
    encodeVideo(frameDir, OUT_MP4, ['-c:v', 'libx264', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart']);
    console.log(`OK: ${sink.count} frames @${FPS}fps -> ${OUT_WEBM} ${OUT_MP4}`);
    console.log(`dropdown shot: ${SHOT_DROPDOWN}`);
    console.log(`state machine panel shot: ${SHOT_PANEL}`);
  } finally {
    await browser.close();
    rmSync(frameDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
