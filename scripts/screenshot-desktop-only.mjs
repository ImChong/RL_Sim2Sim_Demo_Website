import puppeteer from 'puppeteer-core';
import { copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'artifacts', 'screenshots');
const DOCS = join(__dirname, '..', 'docs', 'screenshots');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome',
  headless: true,
  protocolTimeout: 300000,
  args: ['--no-sandbox', '--enable-webgl', '--ignore-gpu-blocklist', '--use-gl=angle', '--enable-unsafe-swiftshader']
});
const page = await browser.newPage();
await page.setBypassCSP(true);
await page.setViewport({ width: 1400, height: 900 });
await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForFunction(() => {
  const d = document.querySelector('.v-dialog')?.textContent ?? '';
  const err = /Unexpected runtime error|发生意外运行时错误/.test(document.body.innerText ?? '');
  const k = document.querySelector('[data-test="knockdown-test"]');
  return !/Loading Simulation|正在加载仿真环境/.test(d) && !err && k && !k.disabled;
}, { timeout: 240000, polling: 500 });
await sleep(12000);
await page.evaluate(() => document.querySelector('.model-io-toggle')?.click());
await page.waitForFunction(() => {
  const p = document.querySelector('.model-io-panel');
  return p && getComputedStyle(p).display !== 'none';
}, { timeout: 15000 });
await sleep(2500);
const full = join(OUT, 'model-io-panel-full.png');
await page.screenshot({ path: full });
await copyFile(full, join(DOCS, 'model-io-panel-full.png'));
const dock = await page.$('.model-io-dock');
const crop = join(OUT, 'model-io-panel-crop.png');
if (dock) {
  await dock.screenshot({ path: crop });
  await copyFile(crop, join(DOCS, 'model-io-panel-crop.png'));
}
await browser.close();
console.log('Desktop screenshots updated');
