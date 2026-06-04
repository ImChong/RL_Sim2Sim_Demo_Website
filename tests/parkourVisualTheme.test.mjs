import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import vm from 'node:vm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bundlePath = join(
  __dirname,
  '../public/parkour/dist-desktop/assets/index-BLR_wER3.js'
);
const bridgePath = join(__dirname, '../public/parkour/dist-desktop/host-bridge.js');

test('parkour bundle uses AMP-style sonic lighting instead of legacy fill lights', () => {
  const bundle = readFileSync(bundlePath, 'utf8');
  assert.match(bundle, /this\.sonicHemi=new RR\(6979754,2769450,\.4\)/);
  assert.match(bundle, /this\.scene\.background=new hB\(\.11,\.18,\.28\)/);
  assert.match(bundle, /this\.renderer\.toneMapping=0,this\.renderer\.toneMappingExposure=1/);
  assert.doesNotMatch(bundle, /this\.fillLightLeft=new uw/);
  assert.doesNotMatch(bundle, /this\.spotlight=new bR/);
});

test('host bridge applyParkourVisualTheme matches theme.js dark background', () => {
  const bridgeSource = readFileSync(bridgePath, 'utf8');
  const demo = {
    visualThemeName: 'dark',
    scene: {
      background: { setRGB(r, g, b) { this.rgb = [r, g, b]; } },
      fog: {}
    },
    ambientLight: { intensity: 0 },
    sonicHemi: {
      color: { setHex() {} },
      groundColor: { setHex() {} },
      intensity: 0
    },
    sonicFill: { color: { setHex() {} }, intensity: 0 },
    sonicRim: { intensity: 0 },
    lights: {},
    lightBaseIntensities: new Map(),
    renderer: { toneMapping: 4, toneMappingExposure: 0.5 },
    render() {}
  };

  const context = {
    window: {
      location: { origin: 'http://localhost' },
      addEventListener() {},
      __parkourDemo: demo
    },
    document: { addEventListener() {} },
    parent: { postMessage() {} },
    requestAnimationFrame() {},
    setInterval() {},
    clearInterval() {}
  };
  context.window.parent = context.parent;

  vm.runInNewContext(bridgeSource, context);

  demo.setVisualTheme('dark');
  assert.deepEqual(demo.scene.background.rgb, [0.11, 0.18, 0.28]);
  assert.equal(demo.scene.fog, null);
  assert.equal(demo.ambientLight.intensity, 0.18);
  assert.equal(demo.sonicHemi.intensity, 0.4);
  assert.equal(demo.renderer.toneMapping, 0);
  assert.equal(demo.renderer.toneMappingExposure, 1);
});
