#!/usr/bin/env node
/**
 * Capture G1 parkour depth HUD (desktop + mobile) after load.
 * Requires: npm run dev
 *
 * Usage:
 *   VITE_URL=http://127.0.0.1:3000/ node scripts/screenshot-parkour-depth-hud.mjs
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3000/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const OUT_DIR = process.env.SCREENSHOT_DIR ?? '/opt/cursor/artifacts/screenshots';

const DESKTOP_OUT = path.join(OUT_DIR, 'parkour-depth-hud-desktop.png');
const MOBILE_OUT = path.join(OUT_DIR, 'parkour-depth-hud-mobile.png');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForParkourReady(page) {
  await page.waitForFunction(
    () => {
      const frame = document.querySelector('.parkour-frame');
      const loading = /Loading Simulation|正在加载仿真环境/.test(
        document.querySelector('.loading-simulation-dialog')?.textContent ?? ''
      );
      return frame && !loading;
    },
    { timeout: 240000, polling: 500 }
  );
  await page.waitForFunction(
    () => {
      const frame = document.querySelector('.parkour-frame');
      const win = frame?.contentWindow;
      const demo = win?.__parkourDemo;
      return demo?.policyController?.isReady && demo?.depthPreviewMaterial?.__depthHudRoundedPatched;
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(4000);
}

async function waitForMainSimulationReady(page) {
  await page.waitForFunction(
    () => !/Loading Simulation|正在加载仿真环境/.test(document.querySelector('.v-dialog')?.textContent ?? ''),
    { timeout: 240000, polling: 500 }
  );
  await sleep(1000);
}

async function selectParkourPolicy(page) {
  const onParkour = await page.evaluate(() => Boolean(document.querySelector('.parkour-frame')));
  if (onParkour) {
    await waitForParkourReady(page);
    return;
  }
  await waitForMainSimulationReady(page);
  await page.evaluate(() => {
    document.querySelector('.controls-mobile-collapsed .controls-title .v-btn')?.click();
  });
  await sleep(400);
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
    throw new Error('Policy select not found');
  }
  await sleep(500);
  await page.waitForSelector('.v-overlay-container .v-list-item', { timeout: 15000 });
  const picked = await page.evaluate(() => {
    const items = [...document.querySelectorAll('.v-overlay-container .v-list-item')];
    const target = items.find((n) => /parkour|跑酷|Perceptive/i.test(n.textContent ?? ''));
    if (!target) {
      return false;
    }
    target.click();
    return true;
  });
  if (!picked) {
    throw new Error('Parkour policy option not found');
  }
  await waitForParkourReady(page);
}

async function captureDepthHudCrop(page, outPath) {
  const box = await page.evaluate(() => {
    const frame = document.querySelector('.parkour-frame');
    if (!frame) {
      return null;
    }
    const rect = frame.getBoundingClientRect();
    const demo = frame.contentWindow?.__parkourDemo;
    const inset = demo?.depthInset;
    const processed = demo?.depthProcessedInset;
    if (!inset || !processed) {
      return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
    }
    const scale = inset.previewScale ?? 4;
    const left = inset.leftOffset ?? inset.margin ?? 16;
    const bottom = inset.bottomOffset ?? inset.margin ?? 16;
    const rawW = inset.width * scale;
    const rawH = inset.height * scale;
    const showRaw = !!demo?.params?.showRawDepth;
    const gap = showRaw ? processed.gap ?? 8 : 0;
    const procW = processed.width * (processed.scale ?? scale);
    const procH = processed.height * (processed.scale ?? scale);
    const hudW = (showRaw ? rawW + gap : 0) + procW;
    const hudH = Math.max(showRaw ? rawH : 0, procH);
    const pad = 24;
    const x = rect.left + left - pad;
    const y = rect.top + rect.height - bottom - hudH - pad;
    return {
      x: Math.max(0, Math.floor(x)),
      y: Math.max(0, Math.floor(y)),
      width: Math.ceil(hudW + pad * 2),
      height: Math.ceil(hudH + pad * 2)
    };
  });
  if (!box) {
    throw new Error('Parkour frame not found for crop');
  }
  await page.screenshot({ path: outPath, clip: box });
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
    const desktopPage = await browser.newPage();
    await desktopPage.setBypassCSP(true);
    await desktopPage.setViewport({ width: 1400, height: 900 });
    await desktopPage.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await selectParkourPolicy(desktopPage);
    await desktopPage.screenshot({ path: DESKTOP_OUT });
    await captureDepthHudCrop(desktopPage, path.join(OUT_DIR, 'parkour-depth-hud-desktop-crop.png'));
    console.log('Wrote', DESKTOP_OUT);
    await desktopPage.close();

    const mobilePage = await browser.newPage();
    await mobilePage.setBypassCSP(true);
    await mobilePage.setViewport({
      width: 390,
      height: 844,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 3
    });
    await mobilePage.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await selectParkourPolicy(mobilePage);
    await mobilePage.screenshot({ path: MOBILE_OUT, fullPage: true });
    await captureDepthHudCrop(mobilePage, path.join(OUT_DIR, 'parkour-depth-hud-mobile-crop.png'));
    console.log('Wrote', MOBILE_OUT);
    await mobilePage.close();
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
