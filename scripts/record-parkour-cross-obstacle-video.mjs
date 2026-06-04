#!/usr/bin/env node
/**
 * Record desktop + mobile parkour runs while holding forward; verify first obstacle cross.
 *
 * Usage:
 *   VITE_URL=http://127.0.0.1:3000/ node scripts/record-parkour-cross-obstacle-video.mjs
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3000/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const OUT_DIR = process.env.VIDEO_DIR ?? '/opt/cursor/artifacts/videos';
const FPS = Number(process.env.VIDEO_FPS ?? 10);
const SECONDS = Number(process.env.VIDEO_SECONDS ?? 22);
const OBSTACLE_DELTA_M = Number(process.env.PARKOUR_OBSTACLE_DELTA_M ?? 4.5);

const DESKTOP_OUT = path.join(OUT_DIR, 'parkour-cross-obstacle-desktop.webm');
const MOBILE_OUT = path.join(OUT_DIR, 'parkour-cross-obstacle-mobile.webm');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForMainReady(page) {
  await page.waitForFunction(
    () => {
      const loading = /Loading Simulation|正在加载仿真环境/.test(
        document.querySelector('.v-dialog')?.textContent ?? ''
      );
      const ampReady = document.querySelector('[data-test="knockdown-test"]');
      return ampReady && !ampReady.disabled && !loading;
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(1500);
}

async function selectParkour(page, viewport) {
  if (await page.evaluate(() => Boolean(document.querySelector('.parkour-frame')))) {
    return;
  }
  await page.evaluate(() => {
    document.querySelectorAll('.v-alert .v-btn').forEach((btn) => btn.click());
    const toggle = document.querySelector('.controls-toggle-btn');
    if (/展开|Expand/i.test(toggle?.textContent?.trim() ?? '')) {
      toggle.click();
    }
  });
  await sleep(500);

  if (viewport?.isMobile) {
    const box = await page.$eval('.controls-card .v-select .v-field', (el) => {
      el.scrollIntoView({ block: 'center' });
      const rect = el.getBoundingClientRect();
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    });
    await page.touchscreen.tap(box.x, box.y);
  } else {
    await page.waitForSelector('.controls-card .v-select .v-field', { timeout: 30000 });
    await page.click('.controls-card .v-select .v-field');
  }

  await page.waitForFunction(
    () => {
      const items = document.querySelectorAll(
        '.v-overlay-container .v-list-item, .v-menu .v-list-item, [role="listbox"] [role="option"]'
      );
      return items.length > 0;
    },
    { timeout: 15000, polling: 200 }
  );
  await sleep(300);
  const picked = await page.evaluate(() => {
    const items = [...document.querySelectorAll('.v-overlay-container .v-list-item, .v-list-item')];
    const target = items.find((n) => /Parkour|跑酷|Perceptive/i.test(n.textContent ?? ''));
    if (!target) {
      return false;
    }
    target.click();
    return true;
  });
  if (!picked) {
    throw new Error('Parkour policy option not found');
  }
}

async function waitForParkourReady(page) {
  await page.waitForFunction(
    () => {
      const loading = /Loading Simulation|正在加载仿真环境/.test(
        document.querySelector('.loading-simulation-dialog')?.textContent ?? ''
      );
      const frame = document.querySelector('.parkour-frame');
      const demo = frame?.contentWindow?.__parkourDemo;
      return !loading && Boolean(frame) && Boolean(demo?.policyController?.isReady);
    },
    { timeout: 240000, polling: 500 }
  );
  await page.waitForFunction(
    () => {
      const preview = document.querySelector('.parkour-frame')?.contentWindow?.__parkourDemo?.depthPreviewPixels;
      if (!preview?.length) {
        return false;
      }
      let avg = 0;
      for (let i = 0; i < preview.length; i += 4) {
        avg += preview[i];
      }
      avg /= preview.length / 4;
      return avg > 5;
    },
    { timeout: 120000, polling: 500 }
  );
  await sleep(2000);
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

async function readRobotState(page) {
  return page.evaluate(() => {
    const demo = document.querySelector('.parkour-frame')?.contentWindow?.__parkourDemo;
    const preview = demo?.depthPreviewPixels;
    let depthAvg = 0;
    if (preview?.length) {
      for (let i = 0; i < preview.length; i += 4) {
        depthAvg += preview[i];
      }
      depthAvg /= preview.length / 4;
    }
    return {
      robotX: demo?.data?.qpos?.[0] ?? 0,
      depthAvg,
      policyReady: Boolean(demo?.policyController?.isReady)
    };
  });
}

async function setForwardInput(page, viewport, active) {
  if (viewport?.isMobile) {
    await page.evaluate((on) => {
      const frame = document.querySelector('.parkour-frame');
      if (!frame?.contentWindow) {
        return;
      }
      frame.contentWindow.postMessage(
        {
          source: 'parkour-host-control',
          type: 'apply',
          virtualInput: {
            active: on,
            w: on,
            a: false,
            d: false,
            highSpeed: false
          }
        },
        window.location.origin
      );
    }, active);
    return;
  }

  if (active) {
    await page.evaluate(() => {
      document.querySelector('.parkour-frame')?.focus();
    });
    await page.keyboard.down('KeyW');
  } else {
    await page.keyboard.up('KeyW');
  }
}

async function recordCrossObstacle(page, viewport, outPath, label) {
  const initial = await readRobotState(page);
  if (!initial.policyReady) {
    throw new Error(`${label}: policy not ready`);
  }
  if (initial.depthAvg < 5) {
    throw new Error(`${label}: depth preview appears black (avg ${initial.depthAvg.toFixed(2)})`);
  }

  if (viewport?.isMobile) {
    await page.evaluate(() => {
      const toggle = document.querySelector('.controls-toggle-btn');
      if (/收起|Collapse/i.test(toggle?.textContent?.trim() ?? '')) {
        toggle.click();
      }
    });
    await sleep(400);
  }

  await setForwardInput(page, viewport, true);

  const frameDir = mkdtempSync(path.join(tmpdir(), 'parkour-cross-'));
  const targetFrames = SECONDS * FPS;
  const frameDelayMs = Math.ceil(1000 / FPS);
  let finalX = initial.robotX;
  let crossed = false;
  const samples = [];

  for (let i = 0; i < targetFrames; i += 1) {
    await page.screenshot({
      path: path.join(frameDir, `frame_${String(i).padStart(5, '0')}.png`),
      type: 'png'
    });

    if (i % FPS === 0) {
      const state = await readRobotState(page);
      finalX = state.robotX;
      const delta = finalX - initial.robotX;
      samples.push({ t: i / FPS, x: finalX, delta });
      console.log(`${label} t=${(i / FPS).toFixed(0)}s x=${finalX.toFixed(2)} delta=${delta.toFixed(2)}m`);
      if (delta > OBSTACLE_DELTA_M) {
        crossed = true;
      }
    }

    if (i + 1 < targetFrames) {
      await sleep(frameDelayMs);
    }
  }

  await setForwardInput(page, viewport, false);
  encodeFrames(frameDir, outPath, FPS);
  rmSync(frameDir, { recursive: true, force: true });

  const delta = finalX - initial.robotX;
  const result = {
    label,
    startX: initial.robotX,
    finalX,
    delta,
    depthAvg: initial.depthAvg,
    crossed,
    samples,
    video: outPath
  };

  if (!crossed) {
    throw new Error(
      `${label}: robot did not cross first obstacle (need > ${OBSTACLE_DELTA_M}m, got ${delta.toFixed(2)}m)`
    );
  }

  return result;
}

async function runViewport(browser, viewport, outPath, label) {
  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('rl-sim2sim-demo-theme', 'dark');
    localStorage.setItem('rl-sim2sim-demo-language', 'zh');
  });
  await page.setViewport(viewport);
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await waitForMainReady(page);
  await selectParkour(page, viewport);
  await waitForParkourReady(page);
  const result = await recordCrossObstacle(page, viewport, outPath, label);
  await page.close();
  return result;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    protocolTimeout: 300000,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--use-gl=angle',
      '--enable-unsafe-swiftshader'
    ]
  });

  try {
    const desktop = await runViewport(
      browser,
      { width: 1400, height: 900, deviceScaleFactor: 1 },
      DESKTOP_OUT,
      'Desktop'
    );
    console.log('Desktop PASS:', desktop.video, `delta=${desktop.delta.toFixed(2)}m`);

    const mobile = await runViewport(
      browser,
      {
        width: 390,
        height: 844,
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true
      },
      MOBILE_OUT,
      'Mobile'
    );
    console.log('Mobile PASS:', mobile.video, `delta=${mobile.delta.toFixed(2)}m`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
