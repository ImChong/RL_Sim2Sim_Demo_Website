#!/usr/bin/env node
/**
 * Record Microduck policy hot-switch from the control-panel dropdown.
 *
 * Usage:
 *   VITE_URL=http://127.0.0.1:3000/ node scripts/record-microduck-policy-switch.mjs
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';

const BASE = process.env.VITE_URL ?? 'http://127.0.0.1:3000/';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';
const OUT_DIR = process.env.VIDEO_DIR ?? '/opt/cursor/artifacts';
const MAX_LOAD_MS = Number(process.env.SCREENSHOT_MAX_LOAD_MS ?? 240000);
const OUT_WEBM = path.join(OUT_DIR, 'microduck_dropdown_hot_switch_walk_sit_roulade.webm');
const OUT_MP4 = path.join(OUT_DIR, 'microduck_dropdown_hot_switch_walk_sit_roulade.mp4');
const SHOT_DROPDOWN = path.join(OUT_DIR, 'microduck_policy_dropdown_open.png');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function encodeVideo(frameDir, outPath, fps, codecArgs) {
  const result = spawnSync(
    'ffmpeg',
    [
      '-y',
      '-framerate', String(fps),
      '-i', path.join(frameDir, 'frame_%05d.jpg'),
      ...codecArgs,
      outPath
    ],
    { encoding: 'utf8' }
  );
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${outPath}: ${result.stderr}`);
  }
}

const FIND_DEMO_PROXY = `() => {
  const app = document.querySelector('#app')?.__vue_app__;
  const stack = app?._instance ? [app._instance] : [];
  while (stack.length) {
    const comp = stack.pop();
    if (!comp) continue;
    if (comp.proxy?.demo?.simulation?.qpos) return comp.proxy;
    const queue = comp.subTree ? [comp.subTree] : [];
    while (queue.length) {
      const vnode = queue.pop();
      if (!vnode) continue;
      if (vnode.component) stack.push(vnode.component);
      if (Array.isArray(vnode.children)) {
        for (const child of vnode.children) queue.push(child);
      }
    }
  }
  return null;
}`;

async function waitForPolicyReady(page) {
  await page.waitForFunction(
    () => {
      const dialogText = document.querySelector('.v-dialog')?.textContent ?? '';
      const loadingVisible = /Loading Simulation|正在加载仿真环境/.test(dialogText);
      const errorDialog = /Unexpected runtime error|发生意外运行时错误/.test(dialogText);
      const policySelect = document.querySelector('[data-test="policy-select"]')
        ?? document.querySelector('.controls-card .v-select input');
      const policyReady = policySelect
        && !policySelect.closest('.v-input')?.classList?.contains?.('v-input--disabled');
      const bodyHasError = /Unexpected runtime error|发生意外运行时错误/.test(document.body.innerText ?? '');
      return !loadingVisible && !errorDialog && !bodyHasError && policyReady;
    },
    { timeout: MAX_LOAD_MS, polling: 400 }
  );
}

async function currentPolicyTitle(page) {
  return page.evaluate(() => {
    const selection = document.querySelector('.controls-card .v-select .v-select__selection-text');
    if (selection?.textContent) {
      return selection.textContent.trim();
    }
    const chips = [...document.querySelectorAll('.controls-card .v-select .v-select__selection')];
    return chips.map((n) => n.textContent?.trim() ?? '').filter(Boolean).join(' ');
  });
}

async function readRobotSnapshot(page) {
  return page.evaluate((findDemoSrc) => {
    const findDemoProxy = eval(findDemoSrc);
    const proxy = findDemoProxy();
    if (!proxy) {
      return null;
    }
    const qpos = proxy.demo.simulation.qpos;
    return {
      policy: proxy.currentPolicy,
      cmdX: proxy.cmdX,
      sit: Boolean(proxy.microduckSitMode),
      hz: Number(proxy.simStepHz) || 0,
      steps: Number(proxy.demo.policyRunner?.stepCount) || 0,
      x: Number(qpos[0]) || 0,
      y: Number(qpos[1]) || 0,
      z: Number(qpos[2]) || 0
    };
  }, FIND_DEMO_PROXY);
}

async function setWalkCommand(page, cmdX) {
  await page.evaluate((findDemoSrc, vx) => {
    const findDemoProxy = eval(findDemoSrc);
    const proxy = findDemoProxy();
    if (!proxy) {
      return;
    }
    proxy.cmdX = vx;
    proxy.cmdY = 0;
    proxy.cmdYaw = 0;
    proxy.onCmdChange();
  }, FIND_DEMO_PROXY, cmdX);
}

async function openPolicyMenu(page) {
  await page.keyboard.press('Escape');
  await sleep(150);
  await page.evaluate(() => {
    document.querySelector('.controls-card .v-select .v-field')?.scrollIntoView({ block: 'center' });
  });
  await sleep(200);
  await page.click('.controls-card .v-select .v-field');
  await page.waitForSelector('.v-overlay-container .v-list-item', { timeout: 15000 });
  await sleep(250);
}

async function clickPolicyItem(page, titlePart) {
  const clicked = await page.evaluate((wanted) => {
    const items = [...document.querySelectorAll('.v-overlay-container .v-list-item')];
    const match = items.find((el) => (el.textContent ?? '').includes(wanted));
    match?.click();
    return Boolean(match);
  }, titlePart);
  if (!clicked) {
    throw new Error(`Could not find policy "${titlePart}"`);
  }
  await page.waitForFunction(
    () => !document.querySelector('.v-overlay-container .v-list'),
    { timeout: 8000 }
  );
  await waitForPolicyReady(page);
  await page.waitForFunction(
    (wanted) => {
      const selection = document.querySelector('.controls-card .v-select .v-select__selection-text');
      const text = selection?.textContent?.trim() ?? '';
      return text.includes(wanted);
    },
    { timeout: 20000 },
    titlePart
  );
  await page.evaluate(() => document.activeElement?.blur?.());
}

async function selectPolicy(page, titlePart) {
  await openPolicyMenu(page);
  await clickPolicyItem(page, titlePart);
}

function logSnap(label, snap) {
  if (!snap) {
    console.log(`${label}: (no demo)`);
    return;
  }
  console.log(
    `${label}: policy=${snap.policy} cmdX=${snap.cmdX.toFixed(2)} sit=${snap.sit}`
    + ` xyz=(${snap.x.toFixed(3)},${snap.y.toFixed(3)},${snap.z.toFixed(3)})`
    + ` hz=${snap.hz.toFixed(1)} steps=${snap.steps}`
  );
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const frameDir = mkdtempSync(path.join(tmpdir(), 'microduck-frames-'));
  let frameCount = 0;
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));

  const client = await page.createCDPSession();
  await client.send('Page.enable');
  let recording = false;
  client.on('Page.screencastFrame', async ({ data, sessionId }) => {
    if (recording) {
      const dest = path.join(frameDir, `frame_${String(frameCount).padStart(5, '0')}.jpg`);
      fs.writeFileSync(dest, Buffer.from(data, 'base64'));
      frameCount += 1;
    }
    try {
      await client.send('Page.screencastFrameAck', { sessionId });
    } catch {
      // page may already be closing
    }
  });

  try {
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await waitForPolicyReady(page);
    await sleep(400);

    await selectPolicy(page, 'Microduck Walk');
    await sleep(800);
    if (!(await currentPolicyTitle(page)).includes('Microduck Walk')) {
      throw new Error(`Walk not selected: ${await currentPolicyTitle(page)}`);
    }
    logSnap('warm-walk', await readRobotSnapshot(page));

    recording = true;
    await client.send('Page.startScreencast', {
      format: 'jpeg',
      quality: 72,
      everyNthFrame: 1
    });
    const recordStart = Date.now();

    await setWalkCommand(page, 0.3);
    await page.keyboard.down('KeyW');
    await sleep(4000);
    await page.keyboard.up('KeyW');
    logSnap('after-walk-W', await readRobotSnapshot(page));
    await sleep(400);

    await openPolicyMenu(page);
    await sleep(1200);
    await page.screenshot({ path: SHOT_DROPDOWN, type: 'png' });
    await clickPolicyItem(page, 'Sit/Stand');
    await sleep(600);
    const sitBtn = await page.waitForSelector('[data-test="microduck-sit-toggle"]', { timeout: 15000 });
    if (await sitBtn.evaluate((n) => n.disabled)) {
      throw new Error('Sit/Stand toggle is disabled');
    }
    await sitBtn.click();
    await sleep(4000);
    logSnap('after-sit', await readRobotSnapshot(page));

    await selectPolicy(page, 'Roulade');
    await sleep(500);
    if (!(await currentPolicyTitle(page)).includes('Roulade')) {
      throw new Error(`Roulade not selected: ${await currentPolicyTitle(page)}`);
    }
    await sleep(5500);
    logSnap('after-roulade', await readRobotSnapshot(page));

    await page.waitForFunction(
      () => {
        const selection = document.querySelector('.controls-card .v-select .v-select__selection-text');
        const text = selection?.textContent?.trim() ?? '';
        const dialogText = document.querySelector('.v-dialog')?.textContent ?? '';
        const loadingVisible = /Loading Simulation|正在加载仿真环境/.test(dialogText);
        return text.includes('Microduck Walk') && !loadingVisible;
      },
      { timeout: 60000 }
    );
    await sleep(1200);
    logSnap('after-auto-walk', await readRobotSnapshot(page));

    recording = false;
    await client.send('Page.stopScreencast').catch(() => {});
    const elapsedSec = Math.max(0.5, (Date.now() - recordStart) / 1000);

    const fatal = errs.filter((e) => !e.includes('ResizeObserver'));
    if (fatal.length) {
      throw new Error(`Page errors: ${fatal.join(' | ')}`);
    }
    if (frameCount < 40) {
      throw new Error(`Too few frames captured: ${frameCount}`);
    }

    const fps = Math.max(8, Math.min(24, Math.round(frameCount / elapsedSec)));
    encodeVideo(frameDir, OUT_WEBM, fps, ['-c:v', 'libvpx-vp9', '-pix_fmt', 'yuv420p', '-auto-alt-ref', '0']);
    encodeVideo(frameDir, OUT_MP4, fps, ['-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart']);
    console.log(`OK: ${frameCount} frames / ${elapsedSec.toFixed(1)}s @${fps}fps -> ${OUT_WEBM} ${OUT_MP4}`);
    console.log(`dropdown shot: ${SHOT_DROPDOWN}`);
  } finally {
    recording = false;
    await browser.close();
    rmSync(frameDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
