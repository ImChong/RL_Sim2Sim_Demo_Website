#!/usr/bin/env node
/**
 * Smoke test: parkour depth map is non-black and robot crosses first obstacle.
 * Usage: VITE_URL=http://127.0.0.1:3000/ node scripts/verify-parkour-depth.mjs
 */
import puppeteer from 'puppeteer-core';

const BASE_URL = process.env.VITE_URL || 'http://127.0.0.1:3000/';
const CHROME_PATH =
  process.env.CHROME_PATH ||
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/usr/local/bin/google-chrome';
const MOBILE = process.env.MOBILE !== '0';
const TIMEOUT_MS = Number(process.env.PARKOUR_TIMEOUT_MS || 180000);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForParkourReady(page) {
  await page.waitForFunction(
    () => {
      const frame = document.querySelector('iframe.parkour-frame');
      const win = frame?.contentWindow;
      const demo = win?.__parkourDemo;
      return demo?.model && demo?.policyController?.isReady;
    },
    { timeout: TIMEOUT_MS, polling: 500 }
  );
}

async function sampleDepthBrightness(page) {
  return page.evaluate(() => {
    const frame = document.querySelector('iframe.parkour-frame');
    const demo = frame?.contentWindow?.__parkourDemo;
    const preview = demo?.depthPreviewPixels;
    if (!preview?.length) {
      return { avg: 0, nonzero: 0, total: 0, hasPolicy: !!demo?.policyController?.isReady };
    }
    let sum = 0;
    let nonzero = 0;
    for (let i = 0; i < preview.length; i += 4) {
      const v = preview[i];
      sum += v;
      if (v > 0) nonzero += 1;
    }
    const pixels = preview.length / 4;
    return {
      avg: sum / pixels,
      nonzero,
      total: pixels,
      hasPolicy: !!demo?.policyController?.isReady,
      robotX: demo?.data?.qpos?.[0] ?? 0
    };
  });
}

async function holdForward(page) {
  const frameHandle = await page.$('iframe.parkour-frame');
  const frame = await frameHandle.contentFrame();
  await frame.focus('body');
  await page.keyboard.down('KeyW');
}

async function releaseForward(page) {
  await page.keyboard.up('KeyW');
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();
    if (MOBILE) {
      await page.emulate({
        name: 'iPhone 13',
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        viewport: {
          width: 390,
          height: 844,
          deviceScaleFactor: 3,
          isMobile: true,
          hasTouch: true
        }
      });
    }

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 120000 });

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
    await sleep(500);

    await page.click('.controls-card .v-select .v-field');
    await sleep(600);

    await page.waitForSelector('.v-overlay-container .v-list-item', { timeout: 15000 });
    const items = await page.$$('.v-overlay-container .v-list-item');
    for (const item of items) {
      const text = await page.evaluate((el) => el.textContent?.trim() ?? '', item);
      if (/Parkour|跑酷/i.test(text)) {
        await item.click();
        break;
      }
    }

    await page.waitForSelector('iframe.parkour-frame', { timeout: 30000 });
    await waitForParkourReady(page);

    await sleep(3000);
    let depth = await sampleDepthBrightness(page);
    console.log('Initial depth sample:', depth);

    if (!depth.hasPolicy) {
      throw new Error('Policy controller not ready');
    }
    if (depth.avg < 5) {
      throw new Error(`Depth preview appears black (avg brightness ${depth.avg.toFixed(2)})`);
    }

    await holdForward(page);

    const startX = depth.robotX;
    const deadline = Date.now() + 120000;
    let crossed = false;
    while (Date.now() < deadline) {
      await sleep(1000);
      depth = await sampleDepthBrightness(page);
      console.log('Progress:', depth);
      if (depth.robotX > startX + 4.5) {
        crossed = true;
        break;
      }
    }

    await releaseForward(page);

    if (!crossed) {
      throw new Error(
        `Robot did not cross first obstacle (startX=${startX.toFixed(2)}, finalX=${depth.robotX.toFixed(2)})`
      );
    }

    console.log('PASS: depth map visible and robot crossed first obstacle');
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('FAIL:', err.message);
  process.exit(1);
});
