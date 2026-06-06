/**
 * Verify G1 parkour PC keyboard moves the virtual joystick knob (host sync).
 * Usage: VITE_URL=http://127.0.0.1:3000/ node scripts/verify-parkour-keyboard-joystick-sync.mjs
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
    () => {
      const loading = /Loading Simulation|正在加载仿真环境/.test(
        document.querySelector('.loading-simulation-dialog')?.textContent ?? ''
      );
      return !loading && !!document.querySelector('.parkour-mobile-controls');
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(6000);
}

function knobOffsetY(style) {
  const match = /translate\([^,]+,\s*calc\(-50% ([+-]) ([^)]+)\)/.exec(style ?? '');
  if (!match) {
    return 0;
  }
  const sign = match[1] === '-' ? -1 : 1;
  const px = parseFloat(match[2]);
  return Number.isFinite(px) ? sign * px : 0;
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
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await waitForMainReady(page);
  await selectParkour(page);
  await waitForParkour(page);

  const idleKnob = await page.evaluate(() => {
    const style = document.querySelector('.parkour-mobile-controls__stick-knob')?.getAttribute('style') ?? '';
    return { style, offsetY: 0 };
  });
  idleKnob.offsetY = knobOffsetY(idleKnob.style);

  await page.keyboard.down('KeyW');
  await sleep(400);

  const normalKnob = await page.evaluate(() => {
    const style = document.querySelector('.parkour-mobile-controls__stick-knob')?.getAttribute('style') ?? '';
    return { style, offsetY: 0 };
  });
  normalKnob.offsetY = knobOffsetY(normalKnob.style);

  await page.keyboard.down('ShiftLeft');
  await sleep(300);

  const sprintKnob = await page.evaluate(() => {
    const style = document.querySelector('.parkour-mobile-controls__stick-knob')?.getAttribute('style') ?? '';
    return { style, offsetY: 0 };
  });
  sprintKnob.offsetY = knobOffsetY(sprintKnob.style);

  await page.screenshot({
    path: path.join(OUT_DIR, 'parkour-keyboard-joystick-sync.png'),
    fullPage: false
  });

  await page.keyboard.up('ShiftLeft');
  await page.keyboard.up('KeyW');
  await browser.close();

  const knobMovedUp = normalKnob.offsetY < idleKnob.offsetY - 8;
  const sprintFartherThanNormal = sprintKnob.offsetY < normalKnob.offsetY - 6;
  if (!knobMovedUp) {
    throw new Error(
      `Joystick knob did not move up on KeyW (idle=${idleKnob.offsetY}px, normal=${normalKnob.offsetY}px)`
    );
  }
  if (!sprintFartherThanNormal) {
    throw new Error(
      `Shift+W did not push knob farther than W alone (normal=${normalKnob.offsetY}px, sprint=${sprintKnob.offsetY}px)`
    );
  }
  console.log('OK: parkour keyboard-joystick sync verified', {
    idleOffsetY: idleKnob.offsetY,
    normalOffsetY: normalKnob.offsetY,
    sprintOffsetY: sprintKnob.offsetY
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
