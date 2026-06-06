#!/usr/bin/env node
/**
 * Record an iOS-style parkour verification video (depth map + first obstacle).
 * Defaults to the main-site mobile host (iframe + virtual joystick), matching
 * real iPhone Safari usage.
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

const USE_HOST_APP = process.env.USE_DIRECT_PARKOUR !== '1';
const BASE_URL = process.env.VITE_URL || 'http://127.0.0.1:3000/';
const CHROME_PATH =
  process.env.CHROME_PATH ||
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/usr/local/bin/google-chrome';
const MAX_RECORD_SECONDS = Number(process.env.MAX_RECORD_SECONDS || 180);
const FPS = Number(process.env.RECORD_FPS || 15);
const IPHONE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

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
  await sleep(1500);
}

async function selectParkour(page) {
  if (await page.evaluate(() => Boolean(document.querySelector('.parkour-frame')))) {
    return;
  }
  await page.evaluate(() => {
    document.querySelectorAll('.v-alert .v-btn').forEach((btn) => btn.click());
    const toggle = document.querySelector('.controls-toggle-btn');
    if (/展开|Expand/i.test(toggle?.textContent?.trim() ?? '')) {
      toggle.click();
    }
  });
  await sleep(500);

  const box = await page.$eval('.controls-card .v-select .v-field', (el) => {
    el.scrollIntoView({ block: 'center' });
    const rect = el.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  });
  await page.touchscreen.tap(box.x, box.y);
  await sleep(800);

  const picked = await page.evaluate(() => {
    const items = [...document.querySelectorAll('.v-overlay-container .v-list-item, .v-list-item')];
    const target = items.find((n) => /Parkour|跑酷|Perceptive/i.test(n.textContent ?? ''));
    if (!target) {
      return false;
    }
    target.click();
    return true;
  });
  if (!picked) {
    throw new Error('Parkour policy option not found');
  }
}

async function waitForParkourReady(page) {
  if (USE_HOST_APP) {
    await page.waitForFunction(
      () => {
        const loading = /Loading Simulation|正在加载仿真环境/.test(
          document.querySelector('.loading-simulation-dialog')?.textContent ?? ''
        );
        return !loading && Boolean(document.querySelector('.parkour-frame'));
      },
      { timeout: 240000, polling: 500 }
    );
    const deadline = Date.now() + 240000;
    while (Date.now() < deadline) {
      const frame = page.frames().find((entry) => entry.url().includes('/parkour/dist-desktop/'));
      if (frame) {
        const ready = await frame.evaluate(
          () => Boolean(window.__parkourDemo?.policyController?.isReady)
        );
        if (ready) {
          break;
        }
      }
      await sleep(500);
    }
    const ready = await readParkourSnapshot(page);
    if (!ready.policyReady) {
      throw new Error('Parkour policy did not become ready in host iframe');
    }
  } else {
    await page.waitForFunction(() => window.__parkourDemo?.policyController?.isReady, {
      timeout: 180000,
      polling: 500
    });
  }
  await sleep(3000);
}

async function getParkourFrame(page) {
  if (!USE_HOST_APP) {
    return page;
  }
  const frame = page.frames().find((entry) => entry.url().includes('/parkour/dist-desktop/'));
  if (!frame) {
    throw new Error('Parkour iframe frame not found');
  }
  return frame;
}

async function readParkourSnapshot(page) {
  const target = await getParkourFrame(page);
  const snapshot = await target.evaluate(() => {
    const demo = window.__parkourDemo;
    const preview = demo?.depthPreviewPixels;
    let avg = 0;
    if (preview?.length) {
      for (let i = 0; i < preview.length; i += 4) avg += preview[i];
      avg /= preview.length / 4;
    }
    return {
      robotX: demo?.data?.qpos?.[0] ?? 0,
      depthAvg: avg,
      appleDepthReadback: Boolean(demo?._appleDepthReadback),
      policyReady: Boolean(demo?.policyController?.isReady),
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      maxTouchPoints: navigator.maxTouchPoints,
      isMobile: /iPhone|iPad|iPod/.test(navigator.userAgent)
    };
  });
  return snapshot;
}

async function holdJoystickForward(page) {
  const stick = await page.$('.parkour-mobile-controls__stick-base');
  if (!stick) {
    throw new Error('Parkour mobile joystick not found');
  }
  const box = await stick.boundingBox();
  if (!box) {
    throw new Error('Parkour mobile joystick has no layout box');
  }
  const x = box.x + box.width / 2;
  const y = box.y + box.height * 0.12;
  await page.touchscreen.touchStart(x, y);
  return { x, y };
}

async function releaseJoystick(page, point) {
  if (point) {
    await page.touchscreen.touchEnd(point.x, point.y);
  }
}

async function postParkourVirtualInput(page, input) {
  await page.evaluate((virtualInput) => {
    const frame = document.querySelector('.parkour-frame');
    frame?.contentWindow?.postMessage(
      {
        source: 'parkour-host-control',
        type: 'apply',
        virtualInput
      },
      window.location.origin
    );
  }, input);
}

async function holdKeyboardForward(page) {
  await page.focus('body');
  await page.keyboard.down('ShiftLeft');
  await page.keyboard.down('KeyW');
}

async function releaseKeyboardForward(page) {
  await page.keyboard.up('KeyW');
  await page.keyboard.up('ShiftLeft');
}

async function holdHostParkourForward(page) {
  await postParkourVirtualInput(page, {
    active: true,
    w: true,
    a: false,
    d: false,
    highSpeed: true
  });
}

async function releaseHostParkourForward(page) {
  await postParkourVirtualInput(page, {
    active: false,
    w: false,
    a: false,
    d: false,
    highSpeed: false
  });
}

function escapeDrawtext(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/:/g, '\\:').replace(/'/g, "\\'");
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
    userAgent: IPHONE_UA,
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
  if (USE_HOST_APP) {
    await waitForMainReady(page);
    const navigation = page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 240000 });
    await selectParkour(page);
    await navigation;
  }
  await waitForParkourReady(page);

  const start = await readParkourSnapshot(page);
  console.log('Ready:', start);

  await client.send('Page.startScreencast', {
    format: 'jpeg',
    quality: 85,
    everyNthFrame: 1
  });

  let joystickPoint = null;
  if (USE_HOST_APP) {
    joystickPoint = await holdJoystickForward(page);
    await holdHostParkourForward(page);
    console.log(`Recording up to ${MAX_RECORD_SECONDS}s (iPhone host + touch stick + sprint forward)...`);
  } else {
    await holdKeyboardForward(page);
    console.log(`Recording up to ${MAX_RECORD_SECONDS}s while holding W...`);
  }

  const recordStart = Date.now();
  const deadline = recordStart + MAX_RECORD_SECONDS * 1000;
  let crossed = false;
  while (Date.now() < deadline) {
    await sleep(1000);
    const elapsed = Math.round((Date.now() - recordStart) / 1000);
    const progress = await readParkourSnapshot(page);
    console.log(
      `  t=${elapsed}s x=${progress.robotX.toFixed(2)} depth=${progress.depthAvg.toFixed(1)} apple=${progress.appleDepthReadback}`
    );
    if (progress.robotX > start.robotX + 4.5) {
      crossed = true;
      console.log('  crossed first obstacle');
      await sleep(4000);
      break;
    }
  }

  if (USE_HOST_APP) {
    await releaseHostParkourForward(page);
    await releaseJoystick(page, joystickPoint);
  } else {
    await releaseKeyboardForward(page);
  }
  recording = false;
  await client.send('Page.stopScreencast').catch(() => {});
  await browser.close();

  console.log(`Captured ${frameIndex} frames (${crossed ? 'crossed' : 'not-crossed'})`);

  if (frameIndex < 10) {
    throw new Error('Too few frames captured for video');
  }

  const overlayLine1 = escapeDrawtext('iPhone 15 Safari | 393x852 | touch');
  const overlayLine2 = escapeDrawtext(
    `Apple Uint8 depth=${start.appleDepthReadback ? 'ON' : 'OFF'} policy=${start.policyReady ? 'ready' : 'off'}`
  );
  const overlayLine3 = escapeDrawtext(`depth avg=${start.depthAvg.toFixed(1)} host=${USE_HOST_APP ? 'iframe' : 'direct'}`);

  console.log('Encoding mp4...');
  await runFfmpeg([
    '-y',
    '-framerate',
    String(FPS),
    '-i',
    join(FRAMES_DIR, 'frame-%05d.jpg'),
    '-vf',
    [
      'scale=780:1688:flags=lanczos',
      `drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='${overlayLine1}':x=24:y=24:fontsize=26:fontcolor=white:box=1:boxcolor=black@0.55`,
      `drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='${overlayLine2}':x=24:y=64:fontsize=22:fontcolor=#7CFC00:box=1:boxcolor=black@0.55`,
      `drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='${overlayLine3}':x=24:y=98:fontsize=22:fontcolor=#7CFC00:box=1:boxcolor=black@0.55`
    ].join(','),
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
    userAgent: IPHONE_UA,
    viewport: '393x852 @3x',
    hostAppIframe: USE_HOST_APP,
    appleDepthReadback: start.appleDepthReadback,
    navigatorPlatform: start.platform,
    maxTouchPoints: start.maxTouchPoints,
    url: BASE_URL
  };
  writeFileSync(join(OUT_DIR, 'parkour-ios-depth-verify.json'), JSON.stringify(summary, null, 2));

  console.log('Video saved:', OUT_VIDEO);
  console.log(JSON.stringify(summary, null, 2));

  if (!start.appleDepthReadback || !start.policyReady) {
    throw new Error('iOS Uint8 depth path was not active during recording');
  }
  if (start.depthAvg < 2) {
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
