#!/usr/bin/env node
/**
 * Screenshot the parkour depth diagnostic button (desktop + mobile).
 * Usage: VITE_URL=http://127.0.0.1:3000/ node scripts/screenshot-parkour-depth-diagnostic-button.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3000/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const OUT_DIR = process.env.SCREENSHOT_DIR ?? path.join('docs', 'screenshots');

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

async function selectParkourPolicy(page, { mobile = false } = {}) {
  if (mobile) {
    await page.evaluate(() => {
      const toggle = document.querySelector('.controls-toggle-btn');
      if (/展开|Expand/i.test(toggle?.textContent?.trim() ?? '')) {
        toggle.click();
      }
    });
    await sleep(600);
  }

  await page.evaluate(() => {
    document.querySelectorAll('.v-alert .v-btn').forEach((btn) => btn.click());
  });
  await sleep(300);

  const field = await page.$('.controls-card .v-select .v-field');
  if (!field) {
    throw new Error('Policy select not found');
  }
  await field.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  if (mobile) {
    const box = await field.boundingBox();
    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
  } else {
    await field.click();
  }
  await sleep(700);

  const picked = await page.evaluate(() => {
    const items = [...document.querySelectorAll('.v-overlay-container .v-list-item, .v-list-item')];
    const target = items.find((node) => /Parkour|跑酷|Perceptive/i.test(node.textContent ?? ''));
    if (!target) {
      return false;
    }
    target.click();
    return true;
  });
  if (!picked) {
    throw new Error('Parkour policy not found');
  }
  await sleep(1200);
}

async function highlightDiagnosticButton(page) {
  await page.evaluate(() => {
    const btn = document.querySelector('[data-test="parkour-depth-diagnostic"]');
    if (!btn) {
      return;
    }
    btn.scrollIntoView({ block: 'center' });
    btn.style.outline = '3px solid #ff3b30';
    btn.style.outlineOffset = '2px';
    btn.style.boxShadow = '0 0 0 6px rgba(255, 59, 48, 0.35)';
  });
  await sleep(400);
}

async function screenshotViewport(page, filename, clip = null) {
  const filePath = path.join(OUT_DIR, filename);
  await page.screenshot({
    path: filePath,
    type: 'png',
    ...(clip ? { clip } : { fullPage: false })
  });
  return filePath;
}

async function captureDesktop(browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await waitForMainReady(page);
  await selectParkourPolicy(page);

  await page.waitForSelector('[data-test="parkour-depth-diagnostic"]', { timeout: 30000 });
  await highlightDiagnosticButton(page);

  const panel = await page.$('.controls-card');
  const panelBox = await panel.boundingBox();
  return screenshotViewport(page, 'parkour-depth-diagnostic-button-desktop.png', {
    x: Math.max(0, panelBox.x - 8),
    y: Math.max(0, panelBox.y - 8),
    width: Math.min(1440, panelBox.width + 16),
    height: Math.min(900, panelBox.height + 16)
  });
}

async function captureMobile(browser) {
  const page = await browser.newPage();
  await page.emulate({
    name: 'iPhone 15',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    viewport: {
      width: 393,
      height: 852,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true
    }
  });
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await waitForMainReady(page);
  await selectParkourPolicy(page, { mobile: true });

  await page.waitForSelector('[data-test="parkour-depth-diagnostic"]', { timeout: 30000 });
  await highlightDiagnosticButton(page);

  const panel = await page.$('.controls-card');
  const panelBox = await panel.boundingBox();
  return screenshotViewport(page, 'parkour-depth-diagnostic-button-mobile.png', {
    x: Math.max(0, panelBox.x - 4),
    y: Math.max(0, panelBox.y - 4),
    width: Math.min(393, panelBox.width + 8),
    height: Math.min(852 - panelBox.y, panelBox.height + 8)
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const desktop = await captureDesktop(browser);
    const mobile = await captureMobile(browser);
    console.log(JSON.stringify({ desktop, mobile }, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
