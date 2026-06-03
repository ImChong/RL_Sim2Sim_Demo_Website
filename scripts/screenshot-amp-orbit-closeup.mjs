import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const OUT = '/opt/cursor/artifacts/screenshots/amp-mobile-orbit-closeup.png';

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--enable-webgl']
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
await page.evaluateOnNewDocument(() => {
  localStorage.setItem('rl-sim2sim-demo-theme', 'dark');
  localStorage.setItem('rl-sim2sim-demo-language', 'zh');
});
await page.goto(process.env.VITE_URL ?? 'http://127.0.0.1:3001/', {
  waitUntil: 'domcontentloaded',
  timeout: 120000
});
await page.waitForSelector('[data-test="knockdown-test-mobile"]', { timeout: 240000 });
await sleep(3000);
const el = await page.$('.amp-mobile-controls__pad');
fs.mkdirSync('/opt/cursor/artifacts/screenshots', { recursive: true });
await el.screenshot({ path: OUT });
console.log('OK:', OUT);
await browser.close();
