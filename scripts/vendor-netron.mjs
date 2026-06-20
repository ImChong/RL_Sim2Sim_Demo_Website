/**
 * Vendor Netron static web assets into public/netron for in-app ONNX architecture view.
 * Downloads the official PyPI wheel (no Python runtime required at dev time).
 */
import { execSync } from 'node:child_process';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const NETRON_VERSION = '9.1.2';
const WHEEL_NAME = `netron-${NETRON_VERSION}-py3-none-any.whl`;
const WHEEL_URL = `https://files.pythonhosted.org/packages/58/97/26ef0994507ec881b3fa7d50c2cfdc638ef8cc3d8d6869c24e9ee1313b76/${WHEEL_NAME}`;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'netron');
const STAMP_FILE = join(OUT_DIR, '.netron-version');

async function downloadWheel(dest) {
  const response = await fetch(WHEEL_URL);
  if (!response.ok) {
    throw new Error(`Failed to download Netron wheel: ${response.status} ${response.statusText}`);
  }
  await pipeline(response.body, createWriteStream(dest));
}

export async function vendorNetron({ force = false } = {}) {
  if (!force) {
    try {
      const stamp = await readFile(STAMP_FILE, 'utf8');
      if (stamp.trim() === NETRON_VERSION) {
        return { skipped: true, version: NETRON_VERSION, outDir: OUT_DIR };
      }
    } catch {
      // first run or stale install
    }
  }

  const workDir = join(tmpdir(), `netron-vendor-${process.pid}`);
  const wheelPath = join(workDir, WHEEL_NAME);
  const extractDir = join(workDir, 'extract');

  await mkdir(workDir, { recursive: true });
  await downloadWheel(wheelPath);
  await mkdir(extractDir, { recursive: true });
  execSync(`unzip -q -o ${JSON.stringify(wheelPath)} -d ${JSON.stringify(extractDir)}`);

  const sourceDir = join(extractDir, 'netron');
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });
  await cp(sourceDir, OUT_DIR, { recursive: true });
  await writeFile(STAMP_FILE, `${NETRON_VERSION}\n`, 'utf8');
  await rm(workDir, { recursive: true, force: true });

  return { skipped: false, version: NETRON_VERSION, outDir: OUT_DIR };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const force = process.argv.includes('--force');
  vendorNetron({ force })
    .then((result) => {
      const action = result.skipped ? 'already vendored' : 'vendored';
      console.log(`Netron ${result.version} ${action} at ${result.outDir}`);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
