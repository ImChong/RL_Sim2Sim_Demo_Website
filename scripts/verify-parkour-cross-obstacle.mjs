#!/usr/bin/env node
/**
 * Acceptance: after parkour loads, holding W should cross the first obstacle (~4.5m).
 * Usage: VITE_URL=http://127.0.0.1:3000/ node scripts/verify-parkour-cross-obstacle.mjs
 */
import puppeteer from 'puppeteer-core';

const CHROME_PATH =
  process.env.CHROME_PATH ||
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/usr/local/bin/google-chrome';
const BASE_URL = process.env.VITE_URL || 'http://127.0.0.1:3000/';
const MOBILE = process.env.MOBILE === '1';
const PARKOUR_URL = new URL('parkour/dist-desktop/index.html', BASE_URL).href;
const OBSTACLE_DELTA_M = Number(process.env.PARKOUR_OBSTACLE_DELTA_M || 4.5);
const TIMEOUT_MS = Number(process.env.PARKOUR_TIMEOUT_MS || 180000);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readState(page) {
  return page.evaluate(() => {
    const demo = window.__parkourDemo;
    const preview = demo?.depthPreviewPixels;
    let avg = 0;
    if (preview?.length) {
      for (let i = 0; i < preview.length; i += 4) {
        avg += preview[i];
      }
      avg /= preview.length / 4;
    }
    return {
      robotX: demo?.data?.qpos?.[0] ?? 0,
      depthAvg: avg,
      policyReady: !!demo?.policyController?.isReady
    };
  });
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

    await page.goto(PARKOUR_URL, { waitUntil: 'domcontentloaded', timeout: TIMEOUT_MS });
    await page.waitForFunction(() => window.__parkourDemo?.policyController?.isReady, {
      timeout: TIMEOUT_MS,
      polling: 500
    });
    await sleep(3000);

    const initial = await readState(page);
    if (!initial.policyReady) {
      throw new Error('Policy not ready after load');
    }
    if (initial.depthAvg < 5) {
      throw new Error(`Depth preview appears black (avg ${initial.depthAvg.toFixed(2)})`);
    }

    await page.focus('body');
    await page.keyboard.down('KeyW');

    const startX = initial.robotX;
    let finalX = startX;
    let crossed = false;
    const deadline = Date.now() + TIMEOUT_MS;
    while (Date.now() < deadline) {
      await sleep(1000);
      const state = await readState(page);
      finalX = state.robotX;
      console.log(`  x=${finalX.toFixed(2)} (delta ${(finalX - startX).toFixed(2)}m)`);
      if (finalX > startX + OBSTACLE_DELTA_M) {
        crossed = true;
        break;
      }
    }
    await page.keyboard.up('KeyW');

    console.log(
      `startX=${startX.toFixed(2)} finalX=${finalX.toFixed(2)} delta=${(finalX - startX).toFixed(2)} depthAvg=${initial.depthAvg.toFixed(1)}`
    );

    if (!crossed) {
      throw new Error(
        `Robot did not cross first obstacle (need delta > ${OBSTACLE_DELTA_M}m, got ${(finalX - startX).toFixed(2)}m)`
      );
    }

    console.log('PASS: robot crossed first obstacle after load');
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('FAIL:', err.message);
  process.exit(1);
});
