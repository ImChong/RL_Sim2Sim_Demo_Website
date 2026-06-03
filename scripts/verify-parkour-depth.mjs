/**
 * Smoke test for the G1 Perceptive Parkour depth pipeline.
 *
 * Loads the embedded demo, lets the policy run, and inspects window.__parkourDemo.depthFrame.
 * After the RGBA8 packing change the depth frame must still contain plausible, varied
 * depth values (in metres) rather than being all zero (black).
 *
 * Usage: VITE_URL=http://127.0.0.1:5173/ node scripts/verify-parkour-depth.mjs
 */
import puppeteer from 'puppeteer-core';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:5173/';
const PAGE_URL = new URL('parkour/dist-desktop/index.html', BASE).href;
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--window-size=900,700'
    ]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 700 });
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errs.push('console: ' + m.text());
  });

  await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

  await page.waitForFunction(() => !!window.__parkourDemo?.depthFrame, { timeout: 180000 });
  // Let the simulation + policy run so a few depth frames are produced.
  await sleep(8000);

  const stats = await page.evaluate(() => {
    const d = window.__parkourDemo;
    const f = d?.depthFrame;
    if (!f || !f.length) return { ok: false, reason: 'no depthFrame' };
    let min = Infinity, max = -Infinity, sum = 0, nonZero = 0, finite = 0;
    for (let i = 0; i < f.length; i++) {
      const v = f[i];
      if (Number.isFinite(v)) {
        finite++;
        if (v < min) min = v;
        if (v > max) max = v;
        sum += v;
        if (v > 1e-4) nonZero++;
      }
    }
    return {
      ok: true,
      length: f.length,
      min, max,
      mean: sum / finite,
      nonZeroRatio: nonZero / f.length,
      far: d.depthCameraView?.far ?? null,
      type: f.constructor.name
    };
  });

  console.log('depthFrame stats:', JSON.stringify(stats, null, 2));
  if (errs.length) console.log('page errors:', errs.slice(0, 10));

  await browser.close();

  if (!stats.ok) throw new Error('depthFrame unavailable: ' + stats.reason);
  if (stats.nonZeroRatio < 0.05) {
    throw new Error('Depth frame is essentially black (nonZeroRatio=' + stats.nonZeroRatio + ')');
  }
  if (!(stats.max > stats.min)) {
    throw new Error('Depth frame has no variation (min=' + stats.min + ', max=' + stats.max + ')');
  }
  console.log('PASS: depth frame is populated and varied.');
}

main().catch((e) => {
  console.error('FAIL:', e.message);
  process.exit(1);
});
