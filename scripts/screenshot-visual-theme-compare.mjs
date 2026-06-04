/**
 * Capture AMP (default) vs G1 Parkour side-by-side reference screenshots.
 * Usage: VITE_URL=http://127.0.0.1:3000/ node scripts/screenshot-visual-theme-compare.mjs
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3000/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const OUT_DIR = process.env.SCREENSHOT_DIR ?? '/opt/cursor/artifacts/screenshots';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForAmpReady(page) {
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
  await sleep(3000);
}

async function selectPolicy(page, labelPattern) {
  await page.evaluate(() => {
    document.querySelectorAll('.v-alert .v-btn').forEach((btn) => btn.click());
  });
  await sleep(300);
  const field = await page.$('.controls-card .v-select .v-field');
  await field.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await field.click();
  await sleep(600);
  const items = await page.$$('.v-overlay-container .v-list-item');
  for (const el of items) {
    const text = await el.evaluate((n) => n.textContent?.trim() ?? '');
    if (labelPattern.test(text)) {
      await el.click();
      break;
    }
  }
}

async function waitForParkour(page) {
  await page.waitForSelector('iframe.parkour-frame', { timeout: 120000 });
  await page.waitForFunction(
    () => {
      const loading = /Loading Simulation|正在加载仿真环境/.test(
        document.querySelector('.loading-simulation-dialog')?.textContent ?? ''
      );
      return !loading;
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(12000);
}

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

const page = await browser.newPage();
await page.setBypassCSP(true);
await page.evaluateOnNewDocument(() => {
  localStorage.setItem('rl-sim2sim-demo-theme', 'dark');
});
await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });

await waitForAmpReady(page);
const ampPath = path.join(OUT_DIR, 'visual-compare-amp-tracking.png');
await page.screenshot({ path: ampPath, fullPage: false });
console.log('Wrote', ampPath);

await selectPolicy(page, /Parkour|跑酷/i);
await waitForParkour(page);
const parkourPath = path.join(OUT_DIR, 'visual-compare-g1-parkour.png');
await page.screenshot({ path: parkourPath, fullPage: false });
console.log('Wrote', parkourPath);

await browser.close();
