/**
 * Mobile-only parkour joystick screenshots (loads directly at mobile viewport).
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3001/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const OUT_DIR = process.env.SCREENSHOT_DIR ?? '/opt/cursor/artifacts/screenshots';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForMainReady(page) {
  await page.waitForFunction(
    () => {
      const loading = /Loading Simulation|正在加载仿真环境/.test(
        document.querySelector('.v-dialog')?.textContent ?? ''
      );
      const err = /Unexpected runtime error|发生意外运行时错误/.test(
        document.body.innerText ?? ''
      );
      const ampReady = document.querySelector('[data-test="knockdown-test"]');
      return ampReady && !ampReady.disabled && !loading && !err;
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(2000);
}

async function dismissAlerts(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.v-alert .v-btn, .v-alert button').forEach((btn) => btn.click());
  });
  await sleep(400);
}

async function expandMobilePanel(page) {
  await page.evaluate(() => {
    const toggle = document.querySelector('.controls-toggle-btn');
    const label = toggle?.textContent?.trim() ?? '';
    if (/展开|Expand/i.test(label)) {
      toggle.click();
    }
  });
  await sleep(500);
}

async function selectParkourPolicy(page) {
  await dismissAlerts(page);
  await expandMobilePanel(page);
  const field = await page.$('.controls-card .v-select .v-field');
  if (!field) {
    throw new Error('Policy select not found');
  }
  await field.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await field.click();
  await sleep(700);
  await page.waitForSelector('.v-overlay-container .v-list-item', { timeout: 15000 });
  const items = await page.$$('.v-overlay-container .v-list-item');
  for (const el of items) {
    const text = await el.evaluate((n) => n.textContent?.trim() ?? '');
    if (/Parkour|跑酷/i.test(text)) {
      await el.click();
      break;
    }
  }
}

async function waitForParkourReady(page) {
  await page.waitForFunction(
    () => {
      const loading = /Loading Simulation|正在加载仿真环境/.test(
        document.querySelector('.loading-simulation-dialog')?.textContent ?? ''
      );
      return !loading && !!document.querySelector('.parkour-mobile-controls');
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(10000);
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
  localStorage.setItem('rl-sim2sim-demo-language', 'zh');
});

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
await waitForMainReady(page);
await selectParkourPolicy(page);
await waitForParkourReady(page);

const mobileOut = path.join(OUT_DIR, 'parkour-mobile-joystick.png');
await page.screenshot({ path: mobileOut, fullPage: false });
console.log('Mobile OK:', mobileOut);

const mobilePanelOut = path.join(OUT_DIR, 'parkour-mobile-panel-no-keyboard.png');
await page.screenshot({ path: mobilePanelOut, fullPage: false });
const mobileChecks = await page.evaluate(() => ({
  keyboardGuide: !!document.querySelector('.parkour-controls .parkour-keys'),
  pauseBtn: !!document.querySelector('[data-test="parkour-pause-mobile"]'),
  resetBtn: !!document.querySelector('[data-test="parkour-reset-run-mobile"]')
}));
console.log('Mobile panel (expanded, no keyboard guide):', mobilePanelOut, mobileChecks);

await page.evaluate(() => {
  const toggle = document.querySelector('.controls-toggle-btn');
  const label = toggle?.textContent?.trim() ?? '';
  if (/展开|Expand/i.test(label)) {
    toggle.click();
  }
});
await sleep(600);

const mobileDepthOut = path.join(OUT_DIR, 'parkour-mobile-depth-joystick.png');
await page.screenshot({ path: mobileDepthOut, fullPage: false });
console.log('Mobile (panel collapsed) OK:', mobileDepthOut);

await browser.close();
