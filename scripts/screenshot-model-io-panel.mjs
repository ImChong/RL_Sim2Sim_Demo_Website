/**
 * Capture screenshot of expanded Model I/O flowchart panel.
 * Waits until simulation is fully running (no error dialog).
 *
 * Usage: node scripts/screenshot-model-io-panel.mjs
 */
import puppeteer from 'puppeteer-core';
import { mkdir, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3000/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'artifacts', 'screenshots');
const DOCS_DIR = join(__dirname, '..', 'docs', 'screenshots');
const SETTLE_MS = Number(process.env.SCREENSHOT_SETTLE_MS ?? 8000);
const MAX_LOAD_MS = Number(process.env.SCREENSHOT_MAX_LOAD_MS ?? 240000);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForSimulationReady(page) {
  await page.waitForFunction(
    () => {
      const dialogText = document.querySelector('.v-dialog')?.textContent ?? '';
      const loadingVisible = /Loading Simulation|正在加载仿真环境/.test(dialogText);
      const errorDialog = /Unexpected runtime error|发生意外运行时错误/.test(dialogText);
      const knockdown = document.querySelector('[data-test="knockdown-test"]');
      const policySelect = document.querySelector('.controls-card .v-select input');
      const policyReady = policySelect
        && !policySelect.closest('.v-input')?.classList?.contains?.('v-input--disabled');
      const modelToggle = document.querySelector('.model-io-toggle');
      return !loadingVisible && !errorDialog && policyReady && knockdown && !knockdown.disabled && modelToggle;
    },
    { timeout: MAX_LOAD_MS, polling: 500 }
  );
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(DOCS_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    protocolTimeout: MAX_LOAD_MS + 60000,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1400,900',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--use-gl=angle',
      '--enable-unsafe-swiftshader',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });
  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page.setViewport({ width: 1400, height: 900 });

  const pageErrors = [];
  const consoleErrors = [];
  page.on('pageerror', (e) => pageErrors.push(e.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  console.log(`Opening ${BASE} (max load ${MAX_LOAD_MS}ms, settle ${SETTLE_MS}ms)...`);
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });

  await waitForSimulationReady(page);
  console.log('Simulation ready, settling...');
  await sleep(SETTLE_MS);

  const status = await page.evaluate(() => ({
    hasError: document.body.textContent?.includes('Unexpected runtime error') ?? false,
    knockdownDisabled: document.querySelector('[data-test="knockdown-test"]')?.disabled ?? true,
    liveChip: document.querySelector('.model-io-panel .v-chip')?.textContent?.trim() ?? ''
  }));
  if (status.hasError || status.knockdownDisabled) {
    console.error('Page status:', status);
    console.error('Page errors:', pageErrors.slice(0, 5));
    console.error('Console errors:', consoleErrors.slice(0, 10));
    throw new Error('Simulation not healthy before screenshot');
  }

  await page.evaluate(() => {
    document.querySelector('.model-io-toggle')?.click();
  });
  await page.waitForFunction(
    () => {
      const panel = document.querySelector('.model-io-panel');
      return panel && getComputedStyle(panel).display !== 'none';
    },
    { timeout: 15000 }
  );
  await sleep(1500);

  const fullPath = join(OUT_DIR, 'model-io-panel-full.png');
  await page.screenshot({ path: fullPath, fullPage: false });

  const panel = await page.$('.model-io-dock');
  const panelPath = join(OUT_DIR, 'model-io-panel-crop.png');
  if (panel) {
    await panel.screenshot({ path: panelPath });
  }

  await copyFile(fullPath, join(DOCS_DIR, 'model-io-panel-full.png'));
  await copyFile(panelPath, join(DOCS_DIR, 'model-io-panel-crop.png'));

  console.log('Full page:', fullPath);
  console.log('Panel crop:', panelPath);
  console.log('Copied to', DOCS_DIR);

  const fatal = pageErrors.filter((e) => !e.includes('ResizeObserver'));
  if (fatal.length) {
    console.warn('Non-fatal page errors after load:', fatal.slice(0, 3));
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
