/**
 * E2E smoke test: AMP policy → Knockdown test button visible & clickable.
 * Run with dev server: npm run dev -- --host 127.0.0.1 --port 5173
 *
 * Usage: node scripts/verify-knockdown-button.mjs
 */
import puppeteer from 'puppeteer-core';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:5173/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));

  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });

  await page.waitForFunction(
    () => {
      const sel = document.querySelector('.v-select input');
      return sel && !sel.closest('.v-input')?.classList?.contains?.('v-input--disabled');
    },
    { timeout: 180000 }
  );

  await page.evaluate(() => {
    document.querySelector('.controls-card .v-select .v-field')?.scrollIntoView({ block: 'center' });
  });
  await sleep(300);

  await page.click('.controls-card .v-select .v-field');
  await sleep(600);

  await page.waitForSelector('.v-overlay-container .v-list-item', {
    timeout: 15000
  });
  const items = await page.$$('.v-overlay-container .v-list-item');
  let clickedAmp = false;
  for (const el of items) {
    const text = await el.evaluate((n) => n.textContent?.trim() ?? '');
    if (text.includes('AMP')) {
      await el.click();
      clickedAmp = true;
      break;
    }
  }
  if (!clickedAmp) {
    throw new Error('Could not find AMP policy in dropdown');
  }

  const knockBtn = await page.waitForSelector('[data-test="knockdown-test"]', { timeout: 30000 });

  const disabled = await knockBtn.evaluate((n) => n.disabled);
  if (disabled) {
    throw new Error('Knockdown button is disabled (simulation not ready?)');
  }

  await knockBtn.click();
  await sleep(800);

  const fatal = errs.filter((e) => !e.includes('ResizeObserver'));
  if (fatal.length) {
    console.error('Page errors:', fatal);
    process.exitCode = 1;
    await browser.close();
    return;
  }

  console.log('OK: AMP selected, Knockdown test clicked, no fatal page errors.');
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
