import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import vm from 'node:vm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = join(__dirname, '../public/perceptive-bfm/dist-desktop/index.html');
const bridgePath = join(__dirname, '../public/perceptive-bfm/dist-desktop/host-bridge.js');

test('BFM embed hides corner HUD chrome in index.html', () => {
  const html = readFileSync(indexPath, 'utf8');
  assert.match(html, /\.hud-top-left[\s\S]*display:\s*none\s*!important/);
  assert.match(html, /\.hud-top-right[\s\S]*display:\s*none\s*!important/);
  assert.match(html, /#model-badge[\s\S]*display:\s*none\s*!important/);
  assert.match(html, /host-bridge\.js/);
  assert.doesNotMatch(html, /\.hud-bottom[\s\S]*display:\s*none/);
});

test('BFM host bridge reports stats and forwards terrain generate', () => {
  const bridgeSource = readFileSync(bridgePath, 'utf8');
  const posts = [];
  const generateCalls = [];
  const app = {
    ready: true,
    simTime: 1.25,
    terrainConfig: { difficulty: 0.4, seed: 1 },
    generateTerrain(cfg) {
      generateCalls.push(cfg);
    }
  };

  const context = {
    window: {
      __app: app,
      location: { origin: 'http://localhost' },
      addEventListener(type, handler) {
        if (type === 'message') {
          context.__messageHandler = handler;
        }
      }
    },
    document: {
      getElementById(id) {
        if (id === 'fps-counter') {
          return { textContent: '42 FPS' };
        }
        return null;
      }
    },
    parent: {
      postMessage(payload) {
        posts.push(payload);
      }
    },
    setInterval(fn) {
      context.__statsTick = fn;
      return 1;
    },
    setTimeout(fn) {
      fn();
      return 1;
    },
    console
  };
  context.window = context.window;
  vm.createContext(context);
  vm.runInNewContext(bridgeSource, context);

  context.__messageHandler({
    data: {
      source: 'bfm-host-control',
      type: 'terrainGenerate',
      difficulty: 0.55,
      seed: 99
    }
  });

  assert.equal(generateCalls.length, 1);
  assert.equal(generateCalls[0].difficulty, 0.55);
  assert.equal(generateCalls[0].seed, 99);

  context.__statsTick();
  const statsPost = posts.find((entry) => entry.source === 'bfm-host' && entry.type === 'stats');
  assert.ok(statsPost, 'expected stats postMessage');
  assert.equal(statsPost.fps, 42);
  assert.equal(statsPost.simTime, 1.25);
  assert.equal(statsPost.terrainConfig?.difficulty, 0.4);
  assert.equal(statsPost.terrainConfig?.seed, 1);
});
