/**
 * Desktop screenshot with W held — joystick knob should move forward in sync.
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3001/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const OUT = process.env.SCREENSHOT_PATH
  ?? '/opt/cursor/artifacts/screenshots/amp-desktop-keyboard-joystick-sync.png';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function knobOffsetY(style) {
  const match = /translate\([^,]+,\s*calc\(-50% ([+-]) ([^)]+)\)/.exec(style ?? '');
  if (!match) {
    return 0;
  }
  const sign = match[1] === '-' ? -1 : 1;
  const px = parseFloat(match[2]);
  return Number.isFinite(px) ? sign * px : 0;
}

async function waitForAmpReady(page) {
  await page.waitForFunction(
    () => {
      const k = document.querySelector('[data-test="knockdown-test-mobile"]');
      return k && !k.disabled;
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(4000);
}

async function main() {
  fs.mkdirSync('/opt/cursor/artifacts/screenshots', { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--enable-webgl', '--ignore-gpu-blocklist']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('rl-sim2sim-demo-theme', 'dark');
    localStorage.setItem('rl-sim2sim-demo-language', 'zh');
  });
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await waitForAmpReady(page);
  const idleKnob = await page.evaluate(() => {
    const style = document.querySelector('.amp-mobile-controls__stick-knob')?.getAttribute('style') ?? '';
    return { style, offsetY: 0 };
  });
  idleKnob.offsetY = knobOffsetY(idleKnob.style);

  await page.keyboard.down('KeyW');
  await sleep(400);
  const normalKnob = await page.evaluate(() => {
    const style = document.querySelector('.amp-mobile-controls__stick-knob')?.getAttribute('style') ?? '';
    return { style, offsetY: 0 };
  });
  normalKnob.offsetY = knobOffsetY(normalKnob.style);

  await page.keyboard.down('ShiftLeft');
  await sleep(300);
  const sprintKnob = await page.evaluate(() => {
    const style = document.querySelector('.amp-mobile-controls__stick-knob')?.getAttribute('style') ?? '';
    return { style, offsetY: 0 };
  });
  sprintKnob.offsetY = knobOffsetY(sprintKnob.style);

  await page.screenshot({ path: OUT, fullPage: false });
  await page.keyboard.up('ShiftLeft');
  await page.keyboard.up('KeyW');

  const knobMovedUp = normalKnob.offsetY < idleKnob.offsetY - 4;
  const sprintFartherThanNormal = sprintKnob.offsetY < normalKnob.offsetY - 4;
  if (!knobMovedUp) {
    throw new Error(
      `AMP joystick knob did not move on KeyW (idle=${idleKnob.offsetY}px, normal=${normalKnob.offsetY}px)`
    );
  }
  if (!sprintFartherThanNormal) {
    throw new Error(
      `Shift+W did not push AMP knob farther (normal=${normalKnob.offsetY}px, sprint=${sprintKnob.offsetY}px)`
    );
  }
  console.log('OK:', OUT, {
    idleOffsetY: idleKnob.offsetY,
    normalOffsetY: normalKnob.offsetY,
    sprintOffsetY: sprintKnob.offsetY
  });
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
