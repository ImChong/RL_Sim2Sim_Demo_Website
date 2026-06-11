/**
 * Verify BFM is blocked on iPhone WebKit (no infinite loading iframe).
 */
import puppeteer from 'puppeteer-core';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3000/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const IPHONE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setUserAgent(IPHONE_UA);
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForFunction(
    () => {
      const sel = document.querySelector('.v-select input');
      return sel && !sel.closest('.v-input')?.classList?.contains?.('v-input--disabled');
    },
    { timeout: 180000 }
  );

  const labels = await page.$$eval('.v-overlay-container .v-list-item', (nodes) =>
    nodes.map((n) => n.textContent?.trim() ?? '')
  ).catch(() => []);

  await page.click('.controls-card .v-select .v-field').catch(() => {});
  await sleep(400);
  const itemsAfterOpen = await page.$$eval('.v-overlay-container .v-list-item', (nodes) =>
    nodes.map((n) => n.textContent?.trim() ?? '')
  ).catch(() => []);

  const policyTexts = [...labels, ...itemsAfterOpen];
  if (policyTexts.some((t) => t.includes('Perceptive BFM'))) {
    throw new Error('BFM should be hidden from policy dropdown on iPhone');
  }

  const direct = await page.goto(`${BASE}perceptive-bfm/dist-desktop/index.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  if (!direct?.ok()) {
    throw new Error('BFM iframe page failed to load');
  }

  const fallbackVisible = await page.evaluate(() => {
    const el = document.querySelector('.mobile-unsupported-fallback');
    if (!el) return false;
    return getComputedStyle(el).display !== 'none';
  });
  if (!fallbackVisible) {
    throw new Error('BFM iframe should show desktop-required fallback on iPhone');
  }

  const loadingVisible = await page.evaluate(() => {
    const el = document.getElementById('loading-screen');
    if (!el) return false;
    return getComputedStyle(el).display !== 'none';
  });
  if (loadingVisible) {
    throw new Error('BFM iframe loading screen should be hidden on iPhone');
  }

  console.log('OK: BFM blocked on iPhone WebKit (dropdown hidden + desktop fallback)');
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
