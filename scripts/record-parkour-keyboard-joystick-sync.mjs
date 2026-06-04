/**
 * Record a short demo: parkour loads, press W, joystick knob moves up, release.
 * Output: /opt/cursor/artifacts/parkour-keyboard-joystick-sync.mp4
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3000/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const OUT_DIR = process.env.ARTIFACT_DIR ?? '/opt/cursor/artifacts';
const OUT_VIDEO = path.join(OUT_DIR, 'parkour-keyboard-joystick-sync.mp4');
const FRAME_DIR = path.join(OUT_DIR, 'parkour-sync-frames');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForMainReady(page) {
  await page.waitForFunction(
    () => {
      const loading = /Loading Simulation|正在加载仿真环境/.test(
        document.querySelector('.v-dialog')?.textContent ?? ''
      );
      const ampReady = document.querySelector('[data-test="knockdown-test"]');
      return ampReady && !ampReady.disabled && !loading;
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(2000);
}

async function selectParkour(page) {
  if (await page.evaluate(() => !!document.querySelector('.parkour-frame'))) {
    return;
  }
  await page.evaluate(() => {
    document.querySelectorAll('.v-alert .v-btn').forEach((btn) => btn.click());
  });
  await sleep(300);
  const field = await page.$('.controls-card .v-select .v-field');
  await field.click();
  await sleep(600);
  for (const el of await page.$$('.v-overlay-container .v-list-item')) {
    const text = await el.evaluate((n) => n.textContent?.trim() ?? '');
    if (/Parkour|跑酷/i.test(text)) {
      await el.click();
      break;
    }
  }
}

async function waitForParkour(page) {
  await page.waitForFunction(
    () => {
      const loading = /Loading Simulation|正在加载仿真环境/.test(
        document.querySelector('.loading-simulation-dialog')?.textContent ?? ''
      );
      return !loading && !!document.querySelector('.parkour-mobile-controls');
    },
    { timeout: 240000, polling: 500 }
  );
  await sleep(5000);
}

async function encodeVideo() {
  const pattern = path.join(FRAME_DIR, 'frame-%04d.png');
  await new Promise((resolve, reject) => {
    const ff = spawn(
      'ffmpeg',
      ['-y', '-framerate', '10', '-i', pattern, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', OUT_VIDEO],
      { stdio: 'inherit' }
    );
    ff.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exit ${code}`))));
  });
}

async function main() {
  fs.mkdirSync(FRAME_DIR, { recursive: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const f of fs.readdirSync(FRAME_DIR)) {
    if (f.startsWith('frame-')) {
      fs.unlinkSync(path.join(FRAME_DIR, f));
    }
  }

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
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });

  let frameIndex = 0;
  async function captureFrame() {
    const name = `frame-${String(frameIndex).padStart(4, '0')}.png`;
    await page.screenshot({ path: path.join(FRAME_DIR, name), fullPage: false });
    frameIndex += 1;
  }

  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await waitForMainReady(page);
  await selectParkour(page);
  await waitForParkour(page);

  for (let i = 0; i < 8; i += 1) {
    await captureFrame();
    await sleep(300);
  }

  await page.keyboard.down('KeyW');
  for (let i = 0; i < 12; i += 1) {
    await captureFrame();
    await sleep(200);
  }

  await page.keyboard.up('KeyW');
  for (let i = 0; i < 8; i += 1) {
    await captureFrame();
    await sleep(300);
  }

  await page.click('.parkour-frame', { offset: { x: 300, y: 250 } });
  await sleep(300);
  await page.keyboard.down('KeyW');
  for (let i = 0; i < 10; i += 1) {
    await captureFrame();
    await sleep(200);
  }
  await page.keyboard.up('KeyW');

  await browser.close();
  await encodeVideo();
  console.log('Recorded:', OUT_VIDEO, `(${frameIndex} frames)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
