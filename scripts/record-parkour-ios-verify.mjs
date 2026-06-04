#!/usr/bin/env node
/**
 * Record an iOS-style parkour verification video (depth map + first obstacle).
 *
 * Usage:
 *   VITE_URL=http://127.0.0.1:3000/ node scripts/record-parkour-ios-verify.mjs
 *
 * Output:
 *   artifacts/parkour-ios-depth-verify.mp4
 */
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = process.env.ARTIFACTS_DIR || join(ROOT, 'artifacts');
const FRAMES_DIR = join(OUT_DIR, 'parkour-ios-frames');
const OUT_VIDEO = join(OUT_DIR, 'parkour-ios-depth-verify.mp4');

const BASE_URL =
  process.env.VITE_URL || 'http://127.0.0.1:3000/parkour/dist-desktop/index.html';
const CHROME_PATH =
  process.env.CHROME_PATH ||
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/usr/local/bin/google-chrome';
const RECORD_SECONDS = Number(process.env.RECORD_SECONDS || 120);
const MAX_RECORD_SECONDS = Number(process.env.MAX_RECORD_SECONDS || 180);
const FPS = Number(process.env.RECORD_FPS || 15);

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
  mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--autoplay-policy=no-user-gesture-required'
    ]
  });

  const page = await browser.newPage();
  await page.emulate({
    name: 'iPhone 15',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    viewport: {
      width: 393,
      height: 852,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true
    }
  });

  const client = await page.createCDPSession();
  await client.send('Page.enable');

  let frameIndex = 0;
  let recording = true;
  client.on('Page.screencastFrame', async ({ data, sessionId }) => {
    if (!recording) return;
    const framePath = join(FRAMES_DIR, `frame-${String(frameIndex).padStart(5, '0')}.jpg`);
    writeFileSync(framePath, Buffer.from(data, 'base64'));
    frameIndex += 1;
    try {
      await client.send('Page.screencastFrameAck', { sessionId });
    } catch {
      // page may already be closing
    }
  });

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForFunction(() => window.__parkourDemo?.policyController?.isReady, {
    timeout: 180000,
    polling: 500
  });

  await sleep(2000);

  const start = await page.evaluate(() => {
    const d = window.__parkourDemo;
    const preview = d?.depthPreviewPixels;
    let avg = 0;
    if (preview?.length) {
      for (let i = 0; i < preview.length; i += 4) avg += preview[i];
      avg /= preview.length / 4;
    }
    return {
      robotX: d?.data?.qpos?.[0] ?? 0,
      depthAvg: avg
    };
  });
  console.log('Ready:', start);

  await client.send('Page.startScreencast', {
    format: 'jpeg',
    quality: 85,
    everyNthFrame: 1
  });

  await page.focus('body');
  await page.keyboard.down('ShiftLeft');
  await page.keyboard.down('KeyW');
  console.log(`Recording up to ${MAX_RECORD_SECONDS}s while holding W...`);

  const recordStart = Date.now();
  const deadline = recordStart + MAX_RECORD_SECONDS * 1000;
  let crossed = false;
  while (Date.now() < deadline) {
    await sleep(1000);
    const elapsed = Math.round((Date.now() - recordStart) / 1000);
    const progress = await page.evaluate(() => ({
      robotX: window.__parkourDemo?.data?.qpos?.[0] ?? 0,
      depthAvg: (() => {
        const preview = window.__parkourDemo?.depthPreviewPixels;
        if (!preview?.length) return 0;
        let sum = 0;
        for (let i = 0; i < preview.length; i += 4) sum += preview[i];
        return sum / (preview.length / 4);
      })()
    }));
    console.log(
      `  t=${elapsed}s x=${progress.robotX.toFixed(2)} depth=${progress.depthAvg.toFixed(1)}`
    );
    if (progress.robotX > start.robotX + 4.5) {
      crossed = true;
      console.log('  crossed first obstacle');
      await sleep(4000);
      break;
    }
  }

  await page.keyboard.up('KeyW');
  await page.keyboard.up('ShiftLeft');
  recording = false;
  await client.send('Page.stopScreencast').catch(() => {});
  await browser.close();

  const finalX = crossed ? 'crossed' : 'not-crossed';
  console.log(`Captured ${frameIndex} frames (${finalX})`);

  if (frameIndex < 10) {
    throw new Error('Too few frames captured for video');
  }

  console.log('Encoding mp4...');
  await runFfmpeg([
    '-y',
    '-framerate',
    String(FPS),
    '-i',
    join(FRAMES_DIR, 'frame-%05d.jpg'),
    '-vf',
    'scale=780:1688:flags=lanczos',
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    OUT_VIDEO
  ]);

  rmSync(FRAMES_DIR, { recursive: true, force: true });

  const summary = {
    video: OUT_VIDEO,
    startRobotX: start.robotX,
    startDepthAvg: start.depthAvg,
    crossedFirstObstacle: crossed,
    frameCount: frameIndex,
    durationSec: Math.round((Date.now() - recordStart) / 1000),
    userAgent: 'iPhone 15 Safari (emulated)',
    url: BASE_URL
  };
  writeFileSync(join(OUT_DIR, 'parkour-ios-depth-verify.json'), JSON.stringify(summary, null, 2));

  console.log('Video saved:', OUT_VIDEO);
  console.log(JSON.stringify(summary, null, 2));

  if (start.depthAvg < 5) {
    throw new Error(`Depth preview too dark at start (avg=${start.depthAvg.toFixed(2)})`);
  }
  if (!crossed) {
    throw new Error('Robot did not cross first obstacle during recording');
  }
}

main().catch((err) => {
  console.error('FAIL:', err.message);
  process.exit(1);
});
