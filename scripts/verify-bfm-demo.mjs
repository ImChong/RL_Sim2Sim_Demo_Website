/**
 * E2E smoke test: switch to G1 Perceptive BFM and wait for demo ready.
 *
 * Usage:
 *   VITE_URL=http://127.0.0.1:3000/ node scripts/verify-bfm-demo.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3000/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const OUT_DIR = process.env.BFM_VERIFY_OUT ?? '/opt/cursor/artifacts/bfm-verify';
const RECORD_VIDEO = process.env.BFM_RECORD_VIDEO === '1';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const launchOpts = {
    executablePath: CHROME,
    headless: !RECORD_VIDEO,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1280,900',
      '--autoplay-policy=no-user-gesture-required'
    ]
  };
  if (RECORD_VIDEO) {
    launchOpts.args.push(`--window-size=1280,900`);
  }

  const browser = await puppeteer.launch(launchOpts);
  const page = await browser.newPage();
  if (RECORD_VIDEO) {
    await page._client().send('Page.startScreencast', {
      format: 'png',
      everyNthFrame: 2
    });
    const frames = [];
    page._client().on('Page.screencastFrame', async (frame) => {
      frames.push(Buffer.from(frame.data, 'base64'));
      await page._client().send('Page.screencastFrameAck', { sessionId: frame.sessionId });
    });
    page._screencastFrames = frames;
  }

  await page.setViewport({ width: 1280, height: 900 });
  const errs = [];
  const consoleLogs = [];
  page.on('pageerror', (e) => errs.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    const text = msg.text();
    consoleLogs.push(`[${msg.type()}] ${text}`);
  });

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

  await page.waitForSelector('.v-overlay-container .v-list-item', { timeout: 15000 });
  const items = await page.$$('.v-overlay-container .v-list-item');
  let clickedBfm = false;
  for (const el of items) {
    const text = await el.evaluate((n) => n.textContent?.trim() ?? '');
    if (text.includes('Perceptive BFM')) {
      await el.click();
      clickedBfm = true;
      break;
    }
  }
  if (!clickedBfm) {
    throw new Error('Could not find G1 Perceptive BFM in policy dropdown');
  }

  const progressHandle = await page.waitForFunction(
  () => {
    const bar = document.querySelector('.loading-simulation-progress');
    if (!bar) return null;
    const val = bar.getAttribute('aria-valuenow');
    return val != null ? Number(val) : null;
  },
  { timeout: 5000, polling: 200 }
  ).catch(() => null);

  let lastProgress = progressHandle
    ? await progressHandle.jsonValue()
  : null;

  const deadline = Date.now() + 240000;
  let ready = false;
  while (Date.now() < deadline) {
    const state = await page.evaluate(() => {
      const dialog = document.querySelector('.loading-simulation-dialog');
      const dialogOpen = dialog && getComputedStyle(dialog).display !== 'none';
      const progress = Number(
        document.querySelector('.loading-simulation-progress')?.getAttribute('aria-valuenow') ?? '0'
      );
      const iframe = document.querySelector('iframe.parkour-frame');
      const iframeVisible = iframe && iframe.offsetParent !== null;
      const loadingScreen = iframe?.contentDocument?.getElementById('loading-screen');
      const iframeLoadingHidden = loadingScreen?.classList.contains('hidden') ?? false;
      const fps = iframe?.contentDocument?.getElementById('fps-counter')?.textContent ?? '';
      const err = iframe?.contentDocument?.getElementById('loading-status')?.textContent ?? '';
      return {
        dialogOpen,
        progress,
        iframeVisible,
        iframeLoadingHidden,
        fps,
        err
      };
    });

    lastProgress = state.progress;
    if (!state.dialogOpen && state.iframeVisible && state.iframeLoadingHidden) {
      ready = true;
      break;
    }
    if (state.fps && !state.fps.includes('--')) {
      ready = true;
      break;
    }
    if (state.err.startsWith('Error:')) {
      throw new Error(`BFM iframe init error: ${state.err}`);
    }
    await sleep(500);
  }

  await page.screenshot({
    path: path.join(OUT_DIR, ready ? 'bfm-demo-ready.png' : 'bfm-demo-stuck.png'),
    fullPage: false
  });

  if (RECORD_VIDEO && page._screencastFrames?.length) {
    const framePath = path.join(OUT_DIR, 'bfm-verify-last-frame.png');
    fs.writeFileSync(framePath, page._screencastFrames.at(-1));
  }

  const fatal = errs.filter((e) => !/ResizeObserver/i.test(e));
  if (!ready) {
    console.error('Stuck at progress:', lastProgress);
    console.error('Console tail:', consoleLogs.slice(-20));
    console.error('Errors:', fatal);
    process.exitCode = 1;
  } else {
    console.log('OK: G1 Perceptive BFM loaded (last progress %s)', lastProgress);
    if (fatal.length) {
      console.warn('Non-fatal page errors:', fatal);
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
