// lib/runtime-bundle.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import esbuild from 'esbuild-wasm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let cachedBundle = null;

export async function getRuntimeBundle() {
  if (cachedBundle) return cachedBundle;

  const cacheDir = path.join(__dirname, '../cache');
  const bundlePath = path.join(cacheDir, 'runtime.bundle.js');

  if (fs.existsSync(bundlePath)) {
    cachedBundle = fs.readFileSync(bundlePath, 'utf8');
    return cachedBundle;
  }

  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  const entry = path.join(__dirname, 'runtime/index.js');
  const result = await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    format: 'iife',
    globalName: 'AgentRuntime',
    write: false,
    minify: true
  });

  cachedBundle = result.outputFiles[0].text;
  fs.writeFileSync(bundlePath, cachedBundle);
  return cachedBundle;
}
