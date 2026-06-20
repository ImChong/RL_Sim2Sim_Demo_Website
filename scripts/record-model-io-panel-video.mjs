#!/usr/bin/env node
/**
 * Record + verify Model I/O panel: horizontal graph, Netron architecture tab,
 * oscilloscope 20s window, and probe switching clears previous channels.
 *
 * Usage:
 *   VITE_URL=http://127.0.0.1:3000/ node scripts/record-model-io-panel-video.mjs
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3000/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const OUT_DIR = process.env.VIDEO_DIR ?? '/opt/cursor/artifacts/videos';
const SCREENSHOT_DIR = process.env.SCREENSHOT_DIR ?? '/opt/cursor/artifacts/screenshots';
const FPS = Number(process.env.VIDEO_FPS ?? 8);
const SECONDS = Number(process.env.VIDEO_SECONDS ?? 18);
const SETTLE_MS = Number(process.env.SCREENSHOT_SETTLE_MS ?? 6000);
const MAX_LOAD_MS = Number(process.env.SCREENSHOT_MAX_LOAD_MS ?? 240000);
const OUT_VIDEO = path.join(OUT_DIR, 'model-io-panel-verify.webm');
const OUT_ARCH_SHOT = path.join(SCREENSHOT_DIR, 'model-io-architecture-netron.png');
const OUT_SCOPE_SHOT = path.join(SCREENSHOT_DIR, 'model-io-scope-20s-window.png');
const OUT_GRAPH_SHOT = path.join(SCREENSHOT_DIR, 'model-io-graph-horizontal.png');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function encodeFrames(frameDir, outPath, fps) {
  const result = spawnSync(
    'ffmpeg',
    [
      '-y',
      '-framerate', String(fps),
      '-i', path.join(frameDir, 'frame_%05d.png'),
      '-c:v', 'libvpx-vp9',
      '-pix_fmt', 'yuv420p',
      '-auto-alt-ref', '0',
      outPath
    ],
    { encoding: 'utf8' }
  );
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${outPath}: ${result.stderr}`);
  }
}

async function waitForSimulationReady(page) {
  await page.waitForFunction(
    () => {
      const dialogText = document.querySelector('.v-dialog')?.textContent ?? '';
      const loadingVisible = /Loading Simulation|正在加载仿真环境/.test(dialogText);
      const errorDialog = /Unexpected runtime error|发生意外运行时错误/.test(dialogText);
      const knockdown = document.querySelector('[data-test="knockdown-test"]');
      const policySelect = document.querySelector('.controls-card .v-select input');
      const policyReady = policySelect
        && !policySelect.closest('.v-input')?.classList?.contains?.('v-input--disabled');
      const modelToggle = document.querySelector('.model-io-toggle');
      const bodyHasError = /Unexpected runtime error|发生意外运行时错误/.test(document.body.innerText ?? '');
      return !loadingVisible && !errorDialog && !bodyHasError && policyReady
        && knockdown && !knockdown.disabled && modelToggle;
    },
    { timeout: MAX_LOAD_MS, polling: 500 }
  );
}

async function expandPipelinePanel(page) {
  await page.evaluate(() => {
    document.querySelector('.model-io-toggle')?.click();
  });
  await page.waitForSelector('.model-io-panel', { visible: true, timeout: 15000 });
  await page.waitForFunction(
    () => {
      const chip = document.querySelector('.model-io-panel .v-chip')?.textContent ?? '';
      return /实时|Live/i.test(chip);
    },
    { timeout: 30000, polling: 200 }
  );
  await sleep(1200);
}

async function switchPanelTab(page, tab) {
  const switched = await page.evaluate((target) => {
    const buttons = [...document.querySelectorAll('.model-io-tabs .v-btn')];
    const btn = buttons.find((el) => el.getAttribute('value') === target);
    if (!btn) {
      return false;
    }
    btn.click();
    return true;
  }, tab);
  if (!switched) {
    throw new Error(`Tab not found: ${tab}`);
  }
  await sleep(700);
}

async function clickNode(page, nodeId) {
  const clicked = await page.evaluate((id) => {
    const node = document.querySelector(`[data-node-id="${id}"]`);
    if (!node) {
      return false;
    }
    const card = node.querySelector('.pipeline-node-card-clickable') ?? node.querySelector('.pipeline-node-card');
    card?.click();
    return Boolean(card);
  }, nodeId);
  if (!clicked) {
    throw new Error(`Pipeline node not found: ${nodeId}`);
  }
  await sleep(400);
}

async function readScopeState(page) {
  return page.evaluate(() => {
    const statsText = document.querySelector('.scope-stats')?.textContent ?? '';
    const channelMatch = statsText.match(/(?:通道|Channels)\s*:\s*(\d+)/i);
    const sampleMatch = statsText.match(/(?:采样|Samples)\s*:\s*(\d+)/i);
    const windowMatch = statsText.match(/(?:窗口|Window)\s*:\s*(\d+)/i);
    const probedNodes = [...document.querySelectorAll('.pipeline-node-probed')].map(
      (el) => el.getAttribute('data-node-id')
    );
    const legendLabels = [...document.querySelectorAll('.scope-legend-label')].map(
      (el) => el.textContent?.trim() ?? ''
    );
    const canvas = document.querySelector('.scope-canvas');
    const netronFrame = document.querySelector('.onnx-netron-frame');
    const graphLayout = document.querySelector('.pipeline-canvas')?.style?.width ?? '';
    return {
      channels: channelMatch ? Number(channelMatch[1]) : 0,
      samples: sampleMatch ? Number(sampleMatch[1]) : 0,
      windowSeconds: windowMatch ? Number(windowMatch[1]) : 0,
      probedNodes,
      legendLabels,
      scopeVisible: Boolean(canvas && canvas.offsetParent !== null),
      netronVisible: Boolean(netronFrame && netronFrame.offsetParent !== null),
      netronSrc: netronFrame?.getAttribute('src') ?? '',
      graphLayout,
      statsText: statsText.replace(/\s+/g, ' ').trim()
    };
  });
}

async function readGraphLayout(page) {
  return page.evaluate(() => {
    const rootPos = document.querySelector('[data-node-id="sim-root-pos"]');
    const onnx = document.querySelector('[data-node-id="onnx"]');
    if (!rootPos || !onnx) {
      return null;
    }
    const rootBox = rootPos.getBoundingClientRect();
    const onnxBox = onnx.getBoundingClientRect();
    return {
      horizontal: onnxBox.left > rootBox.right - 8,
      rootX: rootBox.left,
      onnxX: onnxBox.left
    };
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    protocolTimeout: MAX_LOAD_MS + 120000,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1400,900',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--use-gl=angle',
      '--enable-unsafe-swiftshader',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });

  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('rl-sim2sim-demo-theme', 'dark');
    localStorage.setItem('rl-sim2sim-demo-language', 'zh');
  });
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });

  const pageErrors = [];
  page.on('pageerror', (e) => pageErrors.push(e.message));

  console.log(`Opening ${BASE} ...`);
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await waitForSimulationReady(page);
  await sleep(SETTLE_MS);

  await expandPipelinePanel(page);

  await switchPanelTab(page, 'graph');
  const graphLayout = await readGraphLayout(page);
  console.log('Graph layout:', graphLayout);
  if (!graphLayout?.horizontal) {
    throw new Error('Expected horizontal graph layout (onnx to the right of sim-root-pos)');
  }
  await page.screenshot({ path: OUT_GRAPH_SHOT, fullPage: false });

  await switchPanelTab(page, 'architecture');
  const archState = await readScopeState(page);
  console.log('Architecture tab:', archState);
  if (!archState.netronVisible) {
    throw new Error('Netron architecture iframe not visible');
  }
  if (!/netron\/index\.html\?url=/.test(archState.netronSrc)) {
    throw new Error(`Unexpected Netron iframe src: ${archState.netronSrc}`);
  }
  await sleep(2500);
  await page.screenshot({ path: OUT_ARCH_SHOT, fullPage: false });

  await switchPanelTab(page, 'graph');
  await clickNode(page, 'sim-root-angvel');
  let scopeState = await readScopeState(page);
  console.log('After root angvel probe:', scopeState);
  if (scopeState.channels < 3) {
    throw new Error(`Expected >= 3 channels for root angvel, got ${scopeState.channels}`);
  }
  if (!scopeState.probedNodes.includes('sim-root-angvel')) {
    throw new Error(`Expected sim-root-angvel probed, got ${scopeState.probedNodes.join(',')}`);
  }

  await switchPanelTab(page, 'scope');
  if (!scopeState.scopeVisible) {
    throw new Error('Scope panel not visible');
  }
  if (scopeState.windowSeconds !== 20) {
    throw new Error(`Expected 20s scope window label, got ${scopeState.windowSeconds}`);
  }

  await page.keyboard.down('KeyW');
  await sleep(2500);
  await page.keyboard.up('KeyW');

  const beforeSwitch = await readScopeState(page);
  console.log('Before probe switch:', beforeSwitch);
  if (beforeSwitch.samples < 5) {
    throw new Error(`Expected scope samples to grow before switch, got ${beforeSwitch.samples}`);
  }

  await switchPanelTab(page, 'graph');
  await clickNode(page, 'sim-cmd-vx');
  const afterSwitch = await readScopeState(page);
  console.log('After probe switch:', afterSwitch);
  if (afterSwitch.channels !== 1) {
    throw new Error(`Expected 1 channel after switching to sim-cmd-vx, got ${afterSwitch.channels}`);
  }
  if (afterSwitch.samples > 3) {
    throw new Error(`Expected scope buffer reset after probe switch, got ${afterSwitch.samples} samples`);
  }
  if (afterSwitch.probedNodes.includes('sim-root-angvel')) {
    throw new Error('Previous probed node should be cleared after switching scope target');
  }
  if (afterSwitch.legendLabels.some((label) => /角速度|AngVel/i.test(label))) {
    throw new Error('Previous scope legend entries should be cleared after probe switch');
  }

  await switchPanelTab(page, 'scope');
  await sleep(1200);
  await page.screenshot({ path: OUT_SCOPE_SHOT, fullPage: false });

  const frameDir = mkdtempSync(path.join(tmpdir(), 'model-io-panel-'));
  const targetFrames = SECONDS * FPS;
  const frameDelayMs = Math.ceil(1000 / FPS);
  let maxSamples = 0;

  for (let i = 0; i < targetFrames; i += 1) {
    if (i === Math.floor(targetFrames * 0.35)) {
      await switchPanelTab(page, 'architecture');
    } else if (i === Math.floor(targetFrames * 0.55)) {
      await switchPanelTab(page, 'graph');
    } else if (i === Math.floor(targetFrames * 0.7)) {
      await switchPanelTab(page, 'scope');
    }

    await page.screenshot({
      path: path.join(frameDir, `frame_${String(i).padStart(5, '0')}.png`),
      type: 'png'
    });

    if (i % FPS === 0) {
      const state = await readScopeState(page);
      maxSamples = Math.max(maxSamples, state.samples);
      console.log(`t=${(i / FPS).toFixed(0)}s tab-state samples=${state.samples} window=${state.windowSeconds}s`);
    }

    if (i + 1 < targetFrames) {
      await sleep(frameDelayMs);
    }
  }

  encodeFrames(frameDir, OUT_VIDEO, FPS);
  rmSync(frameDir, { recursive: true, force: true });

  await browser.close();

  const summary = {
    pass: true,
    video: OUT_VIDEO,
    graphScreenshot: OUT_GRAPH_SHOT,
    architectureScreenshot: OUT_ARCH_SHOT,
    scopeScreenshot: OUT_SCOPE_SHOT,
    graphHorizontal: graphLayout.horizontal,
    windowSeconds: scopeState.windowSeconds,
    maxSamples,
    pageErrors: pageErrors.filter((e) => !e.includes('ResizeObserver')).slice(0, 5)
  };

  fs.writeFileSync(
    path.join(OUT_DIR, 'model-io-panel-verify-summary.json'),
    `${JSON.stringify(summary, null, 2)}\n`
  );

  console.log('PASS:', OUT_VIDEO);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
