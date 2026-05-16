/**
 * Capture MuJoCo canvas for PR screenshots.
 * Requires: `npm run build && npm run preview -- --host 127.0.0.1 --port 4173`
 * Env: CHROME_PATH (default google-chrome), VITE_URL (default http://127.0.0.1:4173/)
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:4173/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const OUT = process.env.SCREENSHOT_PATH ?? '/opt/cursor/artifacts/screenshots/pr39-cinematic-render.png';

async function main() {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('rl-sim2sim-demo-theme', 'dark');
    localStorage.setItem('rl-sim2sim-demo-language', 'en');
  });

  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });

  await page.waitForFunction(
    () => {
      const canvas = document.querySelector('#mujoco-container canvas');
      if (!canvas || canvas.width < 64 || canvas.height < 64) {
        return false;
      }
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        return false;
      }
      const sel = document.querySelector('.controls-card .v-select input');
      if (!sel) {
        return false;
      }
      const disabled = sel.closest('.v-input')?.classList?.contains?.('v-input--disabled');
      return !disabled;
    },
    { timeout: 240000 },
  );

  await new Promise((r) => setTimeout(r, 5000));

  const canvas = await page.$('#mujoco-container canvas');
  if (!canvas) {
    throw new Error('Missing #mujoco-container canvas');
  }
  await canvas.screenshot({ path: OUT, type: 'png' });
  console.log('OK:', OUT);
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
