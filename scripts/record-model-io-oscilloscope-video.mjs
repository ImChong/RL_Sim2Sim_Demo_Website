#!/usr/bin/env node
/**
 * Record + verify Model I/O flowchart oscilloscope (signal probe + waveform).
 *
 * Usage:
 *   VITE_URL=http://127.0.0.1:3000/ node scripts/record-model-io-oscilloscope-video.mjs
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
const SECONDS = Number(process.env.VIDEO_SECONDS ?? 14);
const SETTLE_MS = Number(process.env.SCREENSHOT_SETTLE_MS ?? 6000);
const MAX_LOAD_MS = Number(process.env.SCREENSHOT_MAX_LOAD_MS ?? 240000);
const OUT_VIDEO = path.join(OUT_DIR, 'model-io-oscilloscope-verify.webm');
const OUT_SCOPE_SHOT = path.join(SCREENSHOT_DIR, 'model-io-oscilloscope-scope.png');
const OUT_GRAPH_SHOT = path.join(SCREENSHOT_DIR, 'model-io-oscilloscope-graph-probes.png');

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
  await sleep(350);
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
  await sleep(500);
}

async function readScopeState(page) {
  return page.evaluate(() => {
    const statsText = document.querySelector('.scope-stats')?.textContent ?? '';
    const channelMatch = statsText.match(/(?:通道|Channels)\s*:\s*(\d+)/i);
    const sampleMatch = statsText.match(/(?:采样|Samples)\s*:\s*(\d+)/i);
    const windowInput = document.querySelector('.scope-window-input');
    const windowSeconds = windowInput ? Number(windowInput.value) : 0;
    const scopeNode = document.querySelector('[data-node-id="out-scope"]');
    const probedNodes = document.querySelectorAll('.pipeline-node-probed').length;
    const canvas = document.querySelector('.scope-canvas');
    const legendItems = document.querySelectorAll('.scope-legend-item').length;
    const scopeVisible = Boolean(canvas && canvas.offsetParent !== null);
    return {
      channels: channelMatch ? Number(channelMatch[1]) : 0,
      samples: sampleMatch ? Number(sampleMatch[1]) : 0,
      windowSeconds,
      hasScopeNode: Boolean(scopeNode),
      probedNodes,
      legendItems,
      scopeVisible,
      statsText: statsText.replace(/\s+/g, ' ').trim()
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

  // Click a multi-signal node on the graph tab (auto-switches to scope).
  await switchPanelTab(page, 'graph');
  await clickNode(page, 'sim-root-angvel');

  const graphState = await readScopeState(page);
  console.log('After node click (graph tab):', graphState);
  if (graphState.probedNodes < 1) {
    throw new Error(`Expected >= 1 probed node, got ${graphState.probedNodes}`);
  }
  if (!graphState.hasScopeNode) {
    throw new Error('out-scope node missing from pipeline graph');
  }

  await page.screenshot({ path: OUT_GRAPH_SHOT, fullPage: false });
  console.log('Graph probe screenshot:', OUT_GRAPH_SHOT);

  await switchPanelTab(page, 'scope');
  const scopeStart = await readScopeState(page);
  console.log('Scope start:', scopeStart);
  if (!scopeStart.scopeVisible) {
    throw new Error('Scope panel not visible');
  }
  if (scopeStart.channels < 3) {
    throw new Error(`Expected >= 3 scope channels, got ${scopeStart.channels}`);
  }
  if (scopeStart.windowSeconds !== 20) {
    throw new Error(`Expected 20s scope window, got ${scopeStart.windowSeconds}`);
  }
  if (scopeStart.legendItems < 3) {
    throw new Error(`Expected >= 3 legend items, got ${scopeStart.legendItems}`);
  }

  // Hold W so velocity commands change and waveforms move.
  await page.keyboard.down('KeyW');

  const frameDir = mkdtempSync(path.join(tmpdir(), 'model-io-scope-'));
  const targetFrames = SECONDS * FPS;
  const frameDelayMs = Math.ceil(1000 / FPS);
  let maxSamples = scopeStart.samples;

  for (let i = 0; i < targetFrames; i += 1) {
    await page.screenshot({
      path: path.join(frameDir, `frame_${String(i).padStart(5, '0')}.png`),
      type: 'png'
    });

    if (i % FPS === 0) {
      const state = await readScopeState(page);
      maxSamples = Math.max(maxSamples, state.samples);
      console.log(`t=${(i / FPS).toFixed(0)}s channels=${state.channels} samples=${state.samples}`);
    }

    if (i + 1 < targetFrames) {
      await sleep(frameDelayMs);
    }
  }

  await page.keyboard.up('KeyW');
  await sleep(300);

  await switchPanelTab(page, 'graph');
  await clickNode(page, 'sim-cmd-vx');
  const switchedScope = await readScopeState(page);
  if (switchedScope.channels !== 1) {
    throw new Error(`Expected 1 channel after probe switch, got ${switchedScope.channels}`);
  }
  if (switchedScope.samples > 3) {
    throw new Error(`Expected cleared scope samples after probe switch, got ${switchedScope.samples}`);
  }

  await switchPanelTab(page, 'scope');
  const scopeEnd = await readScopeState(page);
  console.log('Scope end:', scopeEnd);

  const scopePanel = await page.$('.model-io-panel');
  if (scopePanel) {
    await scopePanel.screenshot({ path: OUT_SCOPE_SHOT });
    console.log('Scope panel screenshot:', OUT_SCOPE_SHOT);
  }

  encodeFrames(frameDir, OUT_VIDEO, FPS);
  rmSync(frameDir, { recursive: true, force: true });

  await browser.close();

  if (maxSamples < 5) {
    throw new Error(`Scope sample count did not grow enough (max=${maxSamples})`);
  }
  if (scopeEnd.channels !== 1) {
    throw new Error(`Expected 1 channel after probe switch at end, got ${scopeEnd.channels}`);
  }
  if (scopeEnd.windowSeconds !== 20) {
    throw new Error(`Expected 20s scope window at end, got ${scopeEnd.windowSeconds}`);
  }

  const summary = {
    pass: true,
    video: OUT_VIDEO,
    graphScreenshot: OUT_GRAPH_SHOT,
    scopeScreenshot: OUT_SCOPE_SHOT,
    channels: scopeEnd.channels,
    samples: scopeEnd.samples,
    maxSamples,
    windowSeconds: scopeEnd.windowSeconds,
    pageErrors: pageErrors.filter((e) => !e.includes('ResizeObserver')).slice(0, 5)
  };

  fs.writeFileSync(
    path.join(OUT_DIR, 'model-io-oscilloscope-verify-summary.json'),
    `${JSON.stringify(summary, null, 2)}\n`
  );

  console.log('PASS:', OUT_VIDEO);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
