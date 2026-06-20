#!/usr/bin/env node
/**
 * Record a walkthrough of every Model I/O flowchart interaction (desktop).
 *
 * Usage:
 *   VITE_URL=http://127.0.0.1:3000/ node scripts/record-model-io-flowchart-ops-video.mjs
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
const FPS = Number(process.env.VIDEO_FPS ?? 10);
const SETTLE_MS = Number(process.env.SCREENSHOT_SETTLE_MS ?? 6000);
const MAX_LOAD_MS = Number(process.env.SCREENSHOT_MAX_LOAD_MS ?? 240000);
const OUT_VIDEO = path.join(OUT_DIR, 'model-io-flowchart-ops-demo.webm');
const STEP_HOLD_MS = Number(process.env.FLOWCHART_STEP_MS ?? 2200);

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

async function showStepLabel(page, text) {
  await page.evaluate((label) => {
    let el = document.getElementById('flowchart-demo-step');
    if (!el) {
      el = document.createElement('div');
      el.id = 'flowchart-demo-step';
      el.style.cssText = [
        'position:fixed',
        'top:68px',
        'left:50%',
        'transform:translateX(-50%)',
        'z-index:2000',
        'background:rgba(15,23,42,.88)',
        'color:#e2e8f0',
        'padding:10px 16px',
        'border-radius:10px',
        'font:600 14px/1.35 "Noto Sans SC",system-ui,sans-serif',
        'box-shadow:0 8px 24px rgba(0,0,0,.35)',
        'pointer-events:none',
        'white-space:nowrap'
      ].join(';');
      document.body.appendChild(el);
    }
    el.textContent = label;
  }, text);
}

async function hideStepLabel(page) {
  await page.evaluate(() => {
    document.getElementById('flowchart-demo-step')?.remove();
  });
}

async function captureStep(page, frameDir, frameIndex, label, holdMs = STEP_HOLD_MS) {
  await showStepLabel(page, label);
  const frames = Math.max(1, Math.round((holdMs / 1000) * FPS));
  for (let i = 0; i < frames; i += 1) {
    await page.screenshot({
      path: path.join(frameDir, `frame_${String(frameIndex).padStart(5, '0')}.png`),
      type: 'png'
    });
    frameIndex += 1;
    if (i + 1 < frames) {
      await sleep(1000 / FPS);
    }
  }
  return { frameIndex, frames };
}

async function switchPanelTab(page, tab) {
  const switched = await page.evaluate((target) => {
    const btn = [...document.querySelectorAll('.model-io-tabs .v-btn')]
      .find((el) => el.getAttribute('value') === target);
    if (!btn) {
      return false;
    }
    btn.click();
    return true;
  }, tab);
  if (!switched) {
    throw new Error(`Tab not found: ${tab}`);
  }
  await sleep(450);
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

async function resizePanel(page, edge, dx, dy) {
  const selector = edge === 'e'
    ? '.model-io-resize-e'
    : edge === 'ne'
      ? '.model-io-resize-ne'
      : '.model-io-resize-n';
  const handle = await page.$(selector);
  if (!handle) {
    throw new Error(`Resize handle not found: ${selector}`);
  }
  const box = await handle.boundingBox();
  if (!box) {
    throw new Error(`Resize handle box missing: ${selector}`);
  }
  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + dx, startY + dy, { steps: 14 });
  await page.mouse.up();
  await sleep(400);
}

async function waitForNetronReady(page, timeoutMs = 45000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const frame = page.frames().find((f) => f.url().includes('/netron/'));
    if (frame) {
      try {
        const ready = await frame.evaluate(() => (
          document.body?.classList.contains('default')
          || document.querySelectorAll('.node').length > 0
        ));
        if (ready) {
          return;
        }
      } catch {
        // frame loading
      }
    }
    await sleep(250);
  }
  throw new Error(`Netron not ready within ${timeoutMs}ms`);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    protocolTimeout: MAX_LOAD_MS + 180000,
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

  console.log(`Opening ${BASE} ...`);
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await waitForSimulationReady(page);
  await sleep(SETTLE_MS);

  const frameDir = mkdtempSync(path.join(tmpdir(), 'flowchart-ops-'));
  let frameIndex = 0;
  const chapters = [];

  const record = async (label, action, holdMs = STEP_HOLD_MS) => {
    chapters.push({ label, frame: frameIndex, timeSec: (frameIndex / FPS).toFixed(1) });
    console.log(`▶ ${label}`);
    if (action) {
      await action();
    }
    const result = await captureStep(page, frameDir, frameIndex, label, holdMs);
    frameIndex = result.frameIndex;
  };

  await record('① 展开模型流程面板', async () => {
    await page.click('.model-io-toggle');
    await page.waitForSelector('.model-io-panel', { visible: true });
    await page.waitForFunction(
      () => /实时|Live/.test(document.querySelector('.model-io-panel .v-chip')?.textContent ?? ''),
      { timeout: 30000 }
    );
    await switchPanelTab(page, 'graph');
  }, 2600);

  await record('② 横向泳道总览', async () => {
    await switchPanelTab(page, 'graph');
    await sleep(600);
  }, 2400);

  await record('③ 点击节点接入示波器（根角速度）', async () => {
    await switchPanelTab(page, 'graph');
    await clickNode(page, 'sim-root-angvel');
  }, 2400);

  await record('④ 示波器实时波形（按住 W 驱动）', async () => {
    await page.keyboard.down('KeyW');
    await sleep(1800);
    await page.keyboard.up('KeyW');
  }, 2600);

  await record('⑤ 切换探测节点（速度指令 vx，清空旧通道）', async () => {
    await switchPanelTab(page, 'graph');
    await clickNode(page, 'sim-cmd-vx');
  }, 2400);

  await record('⑥ 点击流程图「示波器」汇聚节点', async () => {
    await switchPanelTab(page, 'graph');
    await clickNode(page, 'out-scope');
  }, 2400);

  await record('⑦ 示波器：暂停 · 修改窗口 30s · 继续', async () => {
    await page.waitForSelector('.scope-window-input', { visible: true, timeout: 10000 });
    await page.click('.scope-actions .v-btn');
    await sleep(500);
    await page.$eval('.scope-window-input', (el) => {
      el.value = '30';
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await sleep(500);
    await page.click('.scope-actions .v-btn');
  }, 3000);

  await record('⑧ 拖拽面板右边框 / 上边框调整大小', async () => {
    await switchPanelTab(page, 'graph');
    await resizePanel(page, 'e', 120, 0);
    await resizePanel(page, 'n', 0, -80);
  }, 2800);

  await record('⑨ 切换到「模型架构」标签（Netron）', async () => {
    await switchPanelTab(page, 'architecture');
    await waitForNetronReady(page);
  }, 3200);

  await record('⑩ 收起模型流程面板', async () => {
    await page.click('.model-io-toggle');
    await sleep(600);
  }, 2000);

  await hideStepLabel(page);
  encodeFrames(frameDir, OUT_VIDEO, FPS);
  rmSync(frameDir, { recursive: true, force: true });
  await browser.close();

  const summary = {
    pass: true,
    video: OUT_VIDEO,
    fps: FPS,
    frames: frameIndex,
    durationSec: Number((frameIndex / FPS).toFixed(1)),
    chapters
  };
  fs.writeFileSync(
    path.join(OUT_DIR, 'model-io-flowchart-ops-demo-summary.json'),
    `${JSON.stringify(summary, null, 2)}\n`
  );

  console.log('PASS:', OUT_VIDEO);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
