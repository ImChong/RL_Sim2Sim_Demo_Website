#!/usr/bin/env node
/**
 * Record desktop + mobile clips of the parkour depth HUD after load.
 * Validates rounded corners (no black square artifacts) and radius sync.
 *
 * Usage:
 *   VITE_URL=http://127.0.0.1:3000/ node scripts/record-parkour-depth-hud-video.mjs
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
const FPS = Number(process.env.VIDEO_FPS ?? 12);
const SECONDS = Number(process.env.VIDEO_SECONDS ?? 5);

const DESKTOP_VIDEO = path.join(OUT_DIR, 'parkour-depth-hud-desktop.webm');
const MOBILE_VIDEO = path.join(OUT_DIR, 'parkour-depth-hud-mobile.webm');
const DESKTOP_CROP = path.join(OUT_DIR, 'parkour-depth-hud-desktop-crop.webm');
const MOBILE_CROP = path.join(OUT_DIR, 'parkour-depth-hud-mobile-crop.webm');

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
    const opened = await page.evaluate(() => {
      const field = document.querySelector('.controls-card .v-select .v-field');
      if (!field) {
        return false;
      }
      field.scrollIntoView({ block: 'center' });
      field.click();
      return true;
    });
    if (!opened) {
      throw new Error('Policy select field not found');
    }
  }

  await sleep(800);
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
      return (
        !loading
        && Boolean(frame)
        && Boolean(demo?.policyController?.isReady)
        && Boolean(demo?.depthPreviewMaterial?.__depthHudRoundedPatched)
        && Boolean(demo?.__depthHudRenderPatched)
      );
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(4000);
}

function encodeFrames(frameDir, outPath, fps, crop) {
  const args = [
    '-y',
    '-framerate', String(fps),
    '-i', path.join(frameDir, 'frame_%05d.png'),
    '-c:v', 'libvpx-vp9',
    '-pix_fmt', 'yuv420p',
    '-auto-alt-ref', '0'
  ];
  if (crop) {
    args.push('-vf', `crop=${crop.width}:${crop.height}:${crop.x}:${crop.y}`);
  }
  args.push(outPath);
  const result = spawnSync('ffmpeg', args, { encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${outPath}: ${result.stderr}`);
  }
}

async function recordViewport(page, outPath, cropOutPath, seconds) {
  const crop = await page.evaluate(() => {
    const frame = document.querySelector('.parkour-frame');
    const demo = frame?.contentWindow?.__parkourDemo;
    const inset = demo?.depthInset;
    const processed = demo?.depthProcessedInset;
    if (!frame || !inset || !processed) {
      return null;
    }
    const scale = inset.previewScale ?? 4;
    const left = inset.leftOffset ?? inset.margin ?? 16;
    const bottom = inset.bottomOffset ?? inset.margin ?? 16;
    const showRaw = Boolean(demo?.params?.showRawDepth);
    const gap = showRaw ? processed.gap ?? 8 : 0;
    const procW = processed.width * (processed.scale ?? scale);
    const procH = processed.height * (processed.scale ?? scale);
    const hudW = (showRaw ? inset.width * scale + gap : 0) + procW;
    const hudH = Math.max(showRaw ? inset.height * scale : 0, procH);
    const pad = 20;
    const rect = frame.getBoundingClientRect();
    const x = Math.max(0, Math.floor(rect.left + left - pad));
    const y = Math.max(0, Math.floor(rect.top + rect.height - bottom - hudH - pad));
    return {
      x,
      y,
      width: Math.ceil(hudW + pad * 2),
      height: Math.ceil(hudH + pad * 2)
    };
  });

  const frameDir = mkdtempSync(path.join(tmpdir(), 'parkour-depth-hud-'));
  const targetFrames = seconds * FPS;
  const frameDelayMs = Math.ceil(1000 / FPS);

  for (let i = 0; i < targetFrames; i += 1) {
    await page.screenshot({
      path: path.join(frameDir, `frame_${String(i).padStart(5, '0')}.png`),
      type: 'png'
    });
    if (i + 1 < targetFrames) {
      await sleep(frameDelayMs);
    }
  }

  encodeFrames(frameDir, outPath, FPS);
  if (crop) {
    encodeFrames(frameDir, cropOutPath, FPS, crop);
  }
  rmSync(frameDir, { recursive: true, force: true });
  return crop;
}

async function validateDepthHud(page) {
  return page.evaluate(async () => {
    const frame = document.querySelector('.parkour-frame');
    const demo = frame?.contentWindow?.__parkourDemo;
    const card = document.querySelector('.controls-card');
    if (!frame || !demo || !card) {
      return { ok: false, reason: 'missing frame/demo/card' };
    }

    const cardRadius = parseFloat(getComputedStyle(card).borderTopLeftRadius);
    const inset = demo.depthInset;
    const processed = demo.depthProcessedInset;
    const scale = inset.previewScale ?? 4;
    const procScale = processed.scale ?? scale;
    const procW = processed.width * procScale;
    const procH = processed.height * procScale;
    const left = inset.leftOffset ?? inset.margin ?? 16;
    const bottom = inset.bottomOffset ?? inset.margin ?? 16;
    const uniforms = demo.depthPreviewMaterial?.__depthHudRoundUniforms ?? null;
    const expectedRadiusPx = cardRadius;
    const expectedSizeX = procW;
    const expectedSizeY = procH;

    const rect = frame.getBoundingClientRect();
    const canvas = frame.contentDocument?.querySelector('canvas');
    if (!canvas) {
      return { ok: false, reason: 'missing canvas' };
    }
    const sx = canvas.width / canvas.clientWidth;
    const sy = canvas.height / canvas.clientHeight;

    const sampleHostPixel = (hostX, hostY) => {
      const tmp = document.createElement('canvas');
      tmp.width = 1;
      tmp.height = 1;
      const ctx = tmp.getContext('2d');
      ctx.drawImage(
        canvas,
        (hostX - rect.left) * sx,
        (hostY - rect.top) * sy,
        1,
        1,
        0,
        0,
        1,
        1
      );
      const data = ctx.getImageData(0, 0, 1, 1).data;
      return [data[0], data[1], data[2]];
    };

    const hudLeft = rect.left + left;
    const hudBottom = rect.top + rect.height - bottom;
    const hudTop = hudBottom - procH;
    const hudRight = hudLeft + procW;

    const cornerSquare = sampleHostPixel(hudRight - 2, hudTop + 2);
    const cornerRound = sampleHostPixel(hudRight - 14, hudTop + 14);
    const interior = sampleHostPixel(hudLeft + procW / 2, hudTop + procH / 2);

    const isNearBlack = ([r, g, b]) => r < 12 && g < 12 && b < 12;
    const radiusDelta = Math.abs((uniforms?.cornerRadiusPx?.value ?? 0) - expectedRadiusPx);
    const sizeDeltaX = Math.abs((uniforms?.size?.value?.x ?? 0) - expectedSizeX);
    const sizeDeltaY = Math.abs((uniforms?.size?.value?.y ?? 0) - expectedSizeY);

    return {
      ok: !isNearBlack(cornerSquare)
        && !isNearBlack(cornerRound)
        && radiusDelta < 1
        && sizeDeltaX < 1
        && sizeDeltaY < 1,
      cardRadius,
      uniforms: {
        cornerRadiusPx: uniforms?.cornerRadiusPx?.value ?? null,
        size: uniforms?.size?.value ?? null
      },
      expectedRadiusPx,
      expectedSizeX,
      expectedSizeY,
      radiusDelta,
      sizeDeltaX,
      sizeDeltaY,
      depthWrite: demo.depthPreviewMaterial?.depthWrite,
      transparent: demo.depthPreviewMaterial?.transparent,
      renderPatched: demo.__depthHudRenderPatched,
      cornerSquare,
      cornerRound,
      interior,
      procW,
      procH
    };
  });
}

async function runViewport(browser, viewport, videoPath, cropPath, label) {
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

  if (viewport.isMobile) {
    await page.evaluate(() => {
      const toggle = document.querySelector('.controls-toggle-btn');
      if (/展开|Expand/i.test(toggle?.textContent?.trim() ?? '')) {
        toggle.click();
      }
    });
    await sleep(500);
  }

  const validation = await validateDepthHud(page);
  console.log(`${label} validation:`, JSON.stringify(validation, null, 2));
  if (!validation.ok) {
    await page.close();
    throw new Error(`${label} depth HUD validation failed`);
  }

  await page.keyboard.down('KeyW');
  await recordViewport(page, videoPath, cropPath, SECONDS);
  await page.keyboard.up('KeyW');
  console.log(`${label} wrote`, videoPath, cropPath);
  await page.close();
  return validation;
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
    if (process.env.SKIP_DESKTOP !== '1') {
      const desktopValidation = await runViewport(
        browser,
        { width: 1400, height: 900, deviceScaleFactor: 1 },
        DESKTOP_VIDEO,
        DESKTOP_CROP,
        'Desktop'
      );
      console.log('Desktop radius px:', desktopValidation.cardRadius);
    } else {
      console.log('Skipping desktop recording (SKIP_DESKTOP=1)');
    }

    const mobileValidation = await runViewport(
      browser,
      {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true
      },
      MOBILE_VIDEO,
      MOBILE_CROP,
      'Mobile'
    );

    console.log('All recordings complete.');
    console.log('Mobile radius px:', mobileValidation.cardRadius);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
