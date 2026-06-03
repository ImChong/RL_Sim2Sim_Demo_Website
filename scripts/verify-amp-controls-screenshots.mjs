/**
 * Capture AMP desktop keyboard hints + mobile virtual joystick for verification.
 * Requires dev server: npm run dev (port 3000)
 *
 * Usage:
 *   VITE_URL=http://127.0.0.1:3000/ node scripts/verify-amp-controls-screenshots.mjs
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3000/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const OUT_DIR = process.env.SCREENSHOT_DIR ?? '/opt/cursor/artifacts/screenshots';

const DESKTOP_OUT = path.join(OUT_DIR, 'amp-desktop-keyboard-controls.png');
const MOBILE_OUT = path.join(OUT_DIR, 'amp-mobile-joystick.png');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForAmpReady(page) {
  await page.waitForFunction(
    () => {
      const knockdown = document.querySelector('[data-test="knockdown-test"]');
      const loading = /Loading Simulation|正在加载仿真环境/.test(
        document.querySelector('.v-dialog')?.textContent ?? ''
      );
      const err = /Unexpected runtime error|发生意外运行时错误/.test(
        document.body.innerText ?? ''
      );
      return knockdown && !knockdown.disabled && !loading && !err;
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(4000);
}

async function ensureAmpPolicy(page) {
  const onAmp = await page.evaluate(() => {
    const knockdown = document.querySelector('[data-test="knockdown-test"]');
    const input = document.querySelector('.controls-card .v-select input');
    const value = input?.value ?? '';
    return Boolean(knockdown) || /amp/i.test(value);
  });
  if (onAmp) {
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
    if (/AMP/i.test(text)) {
      await el.click();
      break;
    }
  }
  await waitForAmpReady(page);
}

async function scrollAmpControlsIntoView(page) {
  await page.evaluate(() => {
    const knockdown = document.querySelector('[data-test="knockdown-test"]');
    const keyboard = document.querySelector('.amp-keyboard-controls');
    (keyboard ?? knockdown)?.scrollIntoView({ block: 'center', behavior: 'instant' });
    const body = document.querySelector('.controls-body');
    if (body && knockdown) {
      const top = knockdown.offsetTop - 40;
      body.scrollTop = Math.max(0, top);
    }
  });
  await sleep(400);
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

  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('rl-sim2sim-demo-theme', 'dark');
    localStorage.setItem('rl-sim2sim-demo-language', 'zh');
  });

  // —— Desktop: keyboard hints below knockdown ——
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await waitForAmpReady(page);
  await ensureAmpPolicy(page);

  const desktopChecks = await page.evaluate(() => ({
    keyboard: !!document.querySelector('.amp-keyboard-controls'),
    joystick: !!document.querySelector('.amp-mobile-controls'),
    knockdown: !!document.querySelector('[data-test="knockdown-test"]')
  }));
  if (!desktopChecks.keyboard || desktopChecks.joystick) {
    throw new Error(`Desktop checks failed: ${JSON.stringify(desktopChecks)}`);
  }
  await scrollAmpControlsIntoView(page);
  await page.screenshot({ path: DESKTOP_OUT, fullPage: false });
  console.log('Desktop OK:', DESKTOP_OUT);

  // —— Mobile: virtual joystick above control panel ——
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await waitForAmpReady(page);

  const mobileChecks = await page.evaluate(() => ({
    keyboard: !!document.querySelector('.amp-keyboard-controls'),
    joystick: !!document.querySelector('.amp-mobile-controls'),
    stickBase: !!document.querySelector('.amp-mobile-controls__stick-base'),
    yawBtns: document.querySelectorAll('.amp-mobile-controls__btn-cluster .amp-mobile-controls__action-btn').length - 1,
    knockdownMobile: !!document.querySelector('[data-test="knockdown-test-mobile"]')
  }));
  if (
    mobileChecks.keyboard
    || !mobileChecks.joystick
    || mobileChecks.yawBtns < 2
    || !mobileChecks.knockdownMobile
  ) {
    throw new Error(`Mobile checks failed: ${JSON.stringify(mobileChecks)}`);
  }

  await page.evaluate(() => {
    document.querySelector('.amp-mobile-controls')?.scrollIntoView({ block: 'end' });
  });
  await sleep(500);
  await page.screenshot({ path: MOBILE_OUT, fullPage: false });
  console.log('Mobile OK:', MOBILE_OUT);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
