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
      const loading = document.querySelector('.parkour-loading');
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

async function selectParkourPolicy(page) {
  const onParkour = await page.evaluate(() => Boolean(document.querySelector('.parkour-frame')));
  if (onParkour) {
    return;
  }
  const field = await page.$('.controls-card .v-select .v-field');
  if (!field) {
    throw new Error('Policy select not found');
  }
  await field.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await field.click();
  await sleep(500);
  await page.waitForSelector('.v-overlay-container .v-list-item', { timeout: 15000 });
  const items = await page.$$('.v-overlay-container .v-list-item');
  for (const el of items) {
    const text = await el.evaluate((n) => n.textContent?.trim() ?? '');
    if (/parkour|跑酷|Perceptive/i.test(text)) {
      await el.click();
      break;
    }
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
    const page = await browser.newPage();
    await page.setBypassCSP(true);
    await page.setViewport({ width: 1400, height: 900 });
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await selectParkourPolicy(page);
    await page.screenshot({ path: DESKTOP_OUT });
    await captureDepthHudCrop(page, path.join(OUT_DIR, 'parkour-depth-hud-desktop-crop.png'));
    console.log('Wrote', DESKTOP_OUT);

    await page.setViewport({
      width: 390,
      height: 844,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 3
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await selectParkourPolicy(page);
    await page.screenshot({ path: MOBILE_OUT, fullPage: true });
    await captureDepthHudCrop(page, path.join(OUT_DIR, 'parkour-depth-hud-mobile-crop.png'));
    console.log('Wrote', MOBILE_OUT);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
