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
  await page.keyboard.down('KeyW');
  await sleep(400);
  const sync = await page.evaluate(() => {
    const knob = document.querySelector('.amp-mobile-controls__stick-knob');
    const style = knob?.getAttribute('style') ?? '';
    const cmdX = document.querySelector('.controls-body .text-caption')?.textContent;
    return {
      knobStyle: style,
      knobMoved: /translate\([^)]*[1-9]/.test(style)
    };
  });
  if (!sync.knobMoved) {
    console.warn('Warning: knob may not have moved:', sync);
  }
  await page.screenshot({ path: OUT, fullPage: false });
  await page.keyboard.up('KeyW');
  console.log('OK:', OUT, sync);
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
