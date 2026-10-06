#!/usr/bin/env node
// bin/cli.js
import fs from 'fs';
import { compileCanvas } from '../lib/compiler.js';
import { getAllCanvases } from '../lib/finder.js';

const cmd = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];
const arg3 = process.argv[5];

async function main() {
  if (cmd === 'list') {
    const canvases = getAllCanvases();
    canvases.forEach(c => console.log(c));
  } else if (cmd === 'render') {
    if (!arg1) {
      console.error("Missing file path");
      process.exit(1);
    }
    try {
      const html = await compileCanvas(arg1);
      if (arg2 === '--out' && arg3) {
        fs.writeFileSync(arg3, html);
        console.log(`Rendered to ${arg3}`);
      } else {
        console.log(html);
      }
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
  } else {
    console.error("Unknown command. Use 'list' or 'render <file> [--out <dest>]'");
    process.exit(1);
  }
}

main();
