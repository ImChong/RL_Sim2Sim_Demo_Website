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

async function waitForPolicySelect(page) {
  await page.waitForFunction(
    () => {
      const sel = document.querySelector('.controls-card .v-select input');
      return sel && !sel.closest('.v-input')?.classList?.contains?.('v-input--disabled');
    },
    { timeout: 240000, polling: 500 }
  );
}

async function waitForParkourReady(page) {
  await page.waitForSelector('iframe.parkour-frame', { timeout: 60000 });
  await page.waitForFunction(
    () => {
      const frame = document.querySelector('iframe.parkour-frame');
      const demo = frame?.contentWindow?.__parkourDemo;
      if (!demo?.model) {
        return false;
      }
      let meshCount = 0;
      demo.scene?.traverse?.((obj) => {
        if (obj.isMesh && obj.material && !obj.material.uniforms) {
          meshCount += 1;
        }
      });
      return meshCount > 20;
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(4000);
}

async function selectPolicy(page, labelPattern) {
  await waitForPolicySelect(page);
  await page.evaluate(() => {
    document.querySelector('.controls-card .v-select .v-field')?.scrollIntoView({ block: 'center' });
  });
  await sleep(400);
  await page.click('.controls-card .v-select .v-field');
  await sleep(600);
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

async function captureMainViewport(page, outPath) {
  const canvas = await page.$('#mujoco-container canvas');
  if (canvas) {
    await canvas.screenshot({ path: outPath });
  } else {
    await page.screenshot({ path: outPath, fullPage: false });
  }
  console.log('Saved:', outPath);
}

async function captureParkourViewport(page, outPath) {
  const frameHandle = await page.$('iframe.parkour-frame');
  const frame = await frameHandle.contentFrame();
  const canvas = await frame.$('canvas');
  if (canvas) {
    await canvas.screenshot({ path: outPath });
  } else {
    await page.screenshot({ path: outPath, fullPage: false });
  }
  console.log('Saved:', outPath);
}

async function inspectParkourMaterials(page) {
  return page.evaluate(() => {
    const frame = document.querySelector('iframe.parkour-frame');
    const demo = frame?.contentWindow?.__parkourDemo;
    if (!demo?.scene) {
      return { ok: false, reason: 'no parkour scene' };
    }
    let meshStandard = 0;
    let meshPhysical = 0;
    let meshCount = 0;
    demo.scene.traverse((obj) => {
      if (!obj.isMesh || !obj.material || obj.material.uniforms) {
        return;
      }
      meshCount += 1;
      if (obj.material.isMeshStandardMaterial && !obj.material.isMeshPhysicalMaterial) {
        meshStandard += 1;
      } else if (obj.material.isMeshPhysicalMaterial) {
        meshPhysical += 1;
      }
    });
    return {
      ok: meshStandard > 20 && meshPhysical > 0,
      meshCount,
      meshStandard,
      meshPhysical
    };
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
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
  await captureMainViewport(page, path.join(OUT_DIR, 'g1-amp-mesh-quality.png'));

  await selectPolicy(page, /Tracking|跟踪/i);
  await waitForMainReady(page);
  await captureMainViewport(page, path.join(OUT_DIR, 'g1-tracking-mesh-quality.png'));

  await selectPolicy(page, /Parkour|跑酷/i);
  await waitForParkourReady(page);
  const parkourMaterialCheck = await inspectParkourMaterials(page);
  if (!parkourMaterialCheck.ok) {
    throw new Error(`Parkour material check failed: ${JSON.stringify(parkourMaterialCheck)}`);
  }
  console.log('Parkour material check OK:', parkourMaterialCheck);
  await captureParkourViewport(page, path.join(OUT_DIR, 'g1-parkour-mesh-quality.png'));

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
