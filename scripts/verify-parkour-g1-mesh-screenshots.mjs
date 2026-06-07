/**
 * Capture G1 mesh quality screenshots for AMP, Tracking, and Parkour policies.
 * Requires dev server: npm run dev (port 3000)
 *
 * Usage:
 *   VITE_URL=http://127.0.0.1:3000/ node scripts/verify-parkour-g1-mesh-screenshots.mjs
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3000/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const OUT_DIR = process.env.SCREENSHOT_DIR ?? '/opt/cursor/artifacts/screenshots';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForMainReady(page) {
  await page.waitForFunction(
    () => {
      const loading = /Loading Simulation|正在加载仿真环境/.test(
        document.querySelector('.v-dialog')?.textContent ?? ''
      );
      const err = /Unexpected runtime error|发生意外运行时错误/.test(
        document.body.innerText ?? ''
      );
      const canvas = document.querySelector('#mujoco-container canvas');
      return canvas && !loading && !err;
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(5000);
}

async function waitForParkourReady(page) {
  await page.waitForFunction(
    () => {
      const iframe = document.querySelector('iframe[src*="parkour"]');
      if (!iframe?.contentDocument) {
        return false;
      }
      const doc = iframe.contentDocument;
      const loading = /Loading|加载/.test(doc.body?.textContent ?? '');
      const canvas = doc.querySelector('canvas');
      return canvas && !loading;
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(6000);
}

async function selectPolicy(page, labelPattern) {
  const field = await page.$('.controls-card .v-select .v-field');
  if (!field) {
    throw new Error('Policy select not found');
  }
  await field.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await field.click();
  await sleep(500);
  await page.waitForSelector('.v-overlay-container .v-list-item', { timeout: 15000 });
  const items = await page.$$('.v-overlay-container .v-list-item');
  let clicked = false;
  for (const el of items) {
    const text = await el.evaluate((n) => n.textContent?.trim() ?? '');
    if (labelPattern.test(text)) {
      await el.click();
      clicked = true;
      break;
    }
  }
  if (!clicked) {
    throw new Error(`Policy not found: ${labelPattern}`);
  }
  await sleep(800);
}

async function captureViewport(page, outPath) {
  await page.evaluate(() => {
    const canvas = document.querySelector('#mujoco-container canvas')
      ?? document.querySelector('iframe[src*="parkour"]')?.contentDocument?.querySelector('canvas');
    canvas?.scrollIntoView({ block: 'center', behavior: 'instant' });
  });
  await sleep(500);
  await page.screenshot({ path: outPath, fullPage: false });
  console.log('Saved:', outPath);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    protocolTimeout: 300000,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
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
  await waitForMainReady(page);

  await selectPolicy(page, /AMP/i);
  await waitForMainReady(page);
  await captureViewport(page, path.join(OUT_DIR, 'g1-amp-mesh-quality.png'));

  await selectPolicy(page, /Tracking|跟踪/i);
  await waitForMainReady(page);
  await captureViewport(page, path.join(OUT_DIR, 'g1-tracking-mesh-quality.png'));

  await selectPolicy(page, /Parkour|跑酷/i);
  await waitForParkourReady(page);
  await captureViewport(page, path.join(OUT_DIR, 'g1-parkour-mesh-quality.png'));

  const parkourMaterialCheck = await page.evaluate(() => {
    const iframe = document.querySelector('iframe[src*="parkour"]');
    const demo = iframe?.contentWindow?.__parkourDemo;
    if (!demo?.bodies) {
      return { ok: false, reason: 'no parkour demo bodies' };
    }
    let meshStandard = 0;
    let meshPhysical = 0;
    for (const body of Object.values(demo.bodies)) {
      body.traverse?.((obj) => {
        if (!obj.isMesh || !obj.material) {
          return;
        }
        if (obj.material.isMeshStandardMaterial && !obj.material.isMeshPhysicalMaterial) {
          meshStandard += 1;
        } else if (obj.material.isMeshPhysicalMaterial) {
          meshPhysical += 1;
        }
      });
    }
    return { ok: meshStandard > 20 && meshPhysical === 0, meshStandard, meshPhysical };
  });
  if (!parkourMaterialCheck.ok) {
    throw new Error(`Parkour material check failed: ${JSON.stringify(parkourMaterialCheck)}`);
  }
  console.log('Parkour material check OK:', parkourMaterialCheck);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
