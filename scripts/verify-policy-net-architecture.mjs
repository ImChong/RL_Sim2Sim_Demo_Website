/**
 * E2E: click Policy net in the Model I/O pipeline panel to open Architecture.
 *
 * Usage:
 *   VITE_URL=http://127.0.0.1:3000/ node scripts/verify-policy-net-architecture.mjs
 */
import puppeteer from 'puppeteer-core';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:5173/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const MAX_LOAD_MS = Number(process.env.SCREENSHOT_MAX_LOAD_MS ?? 240000);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
      const bodyHasError = /Unexpected runtime error|发生意外运行时错误/.test(document.body.innerText ?? '');
      return !loadingVisible && !errorDialog && !bodyHasError && policyReady
        && knockdown && !knockdown.disabled && modelToggle;
    },
    { timeout: MAX_LOAD_MS, polling: 500 }
  );
}

async function main() {
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
  await waitForSimulationReady(page);

  await page.click('.model-io-toggle');
  await page.waitForSelector('.model-io-panel', { visible: true, timeout: 15000 });
  await page.waitForFunction(
    () => /实时|Live/.test(document.querySelector('.model-io-panel .v-chip')?.textContent ?? ''),
    { timeout: 30000 }
  );
  await page.waitForSelector('[data-node-id="onnx"]', { visible: true, timeout: 15000 });

  const clickable = await page.$eval('[data-node-id="onnx"]', (el) => (
    el.classList.contains('pipeline-node-clickable')
  ));
  if (!clickable) {
    throw new Error('Policy net node is not marked clickable');
  }

  const graphSelectedBefore = await page.$eval(
    '.model-io-tabs .v-btn[value="graph"]',
    (el) => el.classList.contains('v-btn--active') || el.getAttribute('aria-pressed') === 'true'
  );
  if (!graphSelectedBefore) {
    throw new Error('Graph tab was not active before clicking Policy net');
  }

  await page.$eval('[data-node-id="onnx"]', (el) => {
    const card = el.querySelector('.pipeline-node-card') ?? el;
    card.click();
  });
  await sleep(400);

  const architectureActive = await page.$eval(
    '.model-io-tabs .v-btn[value="architecture"]',
    (el) => el.classList.contains('v-btn--active') || el.getAttribute('aria-pressed') === 'true'
  );
  if (!architectureActive) {
    throw new Error('Architecture tab did not become active after clicking Policy net');
  }

  await page.waitForSelector('.onnx-netron-viewer', { visible: true, timeout: 10000 });
  const viewer = await page.$eval('.onnx-netron-viewer', (el) => ({
    hasFrame: Boolean(el.querySelector('iframe.onnx-netron-frame')),
    empty: el.querySelector('.onnx-netron-empty')?.textContent ?? ''
  }));
  if (!viewer.hasFrame) {
    throw new Error(`Architecture viewer missing Netron iframe: ${JSON.stringify(viewer)}`);
  }

  console.log('OK: clicking Policy net opened Architecture (Netron).');
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
