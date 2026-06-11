#!/usr/bin/env node
/**
 * Record G1 Perceptive BFM policy switch + load verification video.
 *
 * Usage:
 *   VITE_URL=http://127.0.0.1:3000/ node scripts/record-bfm-demo.mjs
 */
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = process.env.ARTIFACTS_DIR || '/opt/cursor/artifacts/bfm-verify';
const FRAMES_DIR = join(OUT_DIR, 'frames');
const OUT_VIDEO = join(OUT_DIR, 'bfm-demo-verify.mp4');
const BASE_URL = process.env.VITE_URL || 'http://127.0.0.1:3000/';
const CHROME_PATH = process.env.CHROME_PATH || '/usr/local/bin/google-chrome';
const FPS = Number(process.env.RECORD_FPS || 12);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('ffmpeg', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    proc.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    proc.on('close', (code) => {
      if (code === 0) resolve(undefined);
      else reject(new Error(`ffmpeg exited ${code}: ${stderr.slice(-800)}`));
    });
  });
}

async function main() {
  rmSync(FRAMES_DIR, { recursive: true, force: true });
  mkdirSync(FRAMES_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  let frameIdx = 0;
  const capture = async () => {
    const file = join(FRAMES_DIR, `frame-${String(frameIdx++).padStart(5, '0')}.png`);
    await page.screenshot({ path: file });
  };

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await capture();

  await page.waitForFunction(
    () => {
      const sel = document.querySelector('.v-select input');
      return sel && !sel.closest('.v-input')?.classList?.contains?.('v-input--disabled');
    },
    { timeout: 180000 }
  );
  await capture();

  await page.click('.controls-card .v-select .v-field');
  await sleep(500);
  await capture();

  const items = await page.$$('.v-overlay-container .v-list-item');
  for (const el of items) {
    const text = await el.evaluate((n) => n.textContent?.trim() ?? '');
    if (text.includes('Perceptive BFM')) {
      await el.click();
      break;
    }
  }
  await sleep(500);
  await capture();

  const deadline = Date.now() + 180000;
  let ready = false;
  while (Date.now() < deadline) {
    await capture();
    const state = await page.evaluate(() => {
      const dialogOpen = /Loading Simulation|正在加载仿真环境/.test(
        document.querySelector('.v-dialog')?.textContent ?? ''
      );
      const iframe = document.querySelector('iframe.parkour-frame');
      const fps = iframe?.contentDocument?.getElementById('fps-counter')?.textContent ?? '';
      const loadingHidden = iframe?.contentDocument
        ?.getElementById('loading-screen')
        ?.classList.contains('hidden');
      return { dialogOpen, fps, loadingHidden };
    });
    if (!state.dialogOpen && state.loadingHidden && state.fps && !state.fps.includes('--')) {
      ready = true;
      break;
    }
    await sleep(1000);
  }

  for (let i = 0; i < 5; i++) {
    await sleep(500);
    await capture();
  }

  await browser.close();

  if (!ready) {
    throw new Error('BFM demo did not become ready during recording');
  }

  await runFfmpeg([
    '-y',
    '-framerate', String(FPS),
    '-i', join(FRAMES_DIR, 'frame-%05d.png'),
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    OUT_VIDEO
  ]);

  writeFileSync(join(OUT_DIR, 'record-summary.txt'), `ready=${ready}\nvideo=${OUT_VIDEO}\nframes=${frameIdx}\n`);
  console.log('Recorded:', OUT_VIDEO);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
