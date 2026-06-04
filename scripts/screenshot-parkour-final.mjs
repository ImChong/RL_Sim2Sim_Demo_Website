/**
 * Capture parkour desktop/mobile screenshots including keyboard-joystick sync.
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
      const ampReady = document.querySelector('[data-test="knockdown-test"]');
      return ampReady && !ampReady.disabled && !loading;
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(2000);
}

async function selectParkour(page) {
  if (await page.evaluate(() => !!document.querySelector('.parkour-frame'))) {
    return;
  }
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
    if (/Parkour|跑酷/i.test(text)) {
      await el.click();
      break;
    }
  }
}

async function waitForParkour(page) {
  await page.waitForFunction(
    () => !document.querySelector('.parkour-loading') && !!document.querySelector('.parkour-mobile-controls'),
    { timeout: 240000, polling: 500 }
  );
  await sleep(8000);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  protocolTimeout: 300000,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist', '--use-gl=angle', '--enable-unsafe-swiftshader']
});

const page = await browser.newPage();
await page.setBypassCSP(true);
await page.evaluateOnNewDocument(() => {
  localStorage.setItem('rl-sim2sim-demo-theme', 'dark');
  localStorage.setItem('rl-sim2sim-demo-language', 'zh');
});

await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
await waitForMainReady(page);
await selectParkour(page);
await waitForParkour(page);

const desktopOut = path.join(OUT_DIR, 'parkour-desktop-joystick.png');
await page.screenshot({ path: desktopOut, fullPage: false });

await page.keyboard.down('KeyW');
await sleep(400);
const desktopWOut = path.join(OUT_DIR, 'parkour-desktop-keyboard-w-sync.png');
await page.screenshot({ path: desktopWOut, fullPage: false });
await page.keyboard.up('KeyW');

const desktopChecks = await page.evaluate(() => ({
  pauseBtn: !!document.querySelector('[data-test="parkour-pause-mobile"]'),
  resetBtn: !!document.querySelector('[data-test="parkour-reset-run-mobile"]'),
  keyboardGuide: !!document.querySelector('.parkour-controls .parkour-keys')
}));
console.log('Desktop OK:', desktopOut, desktopWOut, desktopChecks);

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await sleep(2000);
await waitForParkour(page);

const mobileOut = path.join(OUT_DIR, 'parkour-mobile-joystick.png');
await page.screenshot({ path: mobileOut, fullPage: false });

await page.evaluate(() => {
  const toggle = document.querySelector('.controls-toggle-btn');
  if (/展开|Expand/i.test(toggle?.textContent?.trim() ?? '')) {
    toggle.click();
  }
});
await sleep(500);

const mobilePanelOut = path.join(OUT_DIR, 'parkour-mobile-panel-no-keyboard.png');
await page.screenshot({ path: mobilePanelOut, fullPage: false });

const mobileChecks = await page.evaluate(() => ({
  keyboardGuide: !!document.querySelector('.parkour-controls .parkour-keys'),
  pauseBtn: !!document.querySelector('[data-test="parkour-pause-mobile"]'),
  resetBtn: !!document.querySelector('[data-test="parkour-reset-run-mobile"]')
}));
console.log('Mobile OK:', mobileOut, mobilePanelOut, mobileChecks);

if (desktopChecks.keyboardGuide !== true) {
  throw new Error('Desktop should show parkour keyboard guide');
}
if (mobileChecks.keyboardGuide !== false) {
  throw new Error('Mobile should hide parkour keyboard guide');
}

await browser.close();
