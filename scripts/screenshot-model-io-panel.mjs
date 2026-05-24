/**
 * Capture screenshot of expanded Model I/O flowchart panel.
 * Usage: node scripts/screenshot-model-io-panel.mjs
 */
import puppeteer from 'puppeteer-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3000/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'artifacts', 'screenshots');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });

  await page.waitForFunction(
    () => {
      const btn = document.querySelector('.model-io-toggle');
      return btn && !btn.disabled;
    },
    { timeout: 180000 }
  );

  await sleep(2000);

  await page.waitForSelector('.model-io-toggle', { timeout: 10000 });
  await page.evaluate(() => {
    document.querySelector('.model-io-toggle')?.click();
  });
  await sleep(800);

  await page.waitForFunction(
    () => {
      const panel = document.querySelector('.model-io-panel');
      return panel && getComputedStyle(panel).display !== 'none';
    },
    { timeout: 15000 }
  );
  await sleep(800);

  const fullPath = join(OUT_DIR, 'model-io-panel-full.png');
  await page.screenshot({ path: fullPath, fullPage: false });

  const panel = await page.$('.model-io-dock');
  if (panel) {
    const panelPath = join(OUT_DIR, 'model-io-panel-crop.png');
    await panel.screenshot({ path: panelPath });
    console.log('Panel crop:', panelPath);
  }

  console.log('Full page:', fullPath);
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
