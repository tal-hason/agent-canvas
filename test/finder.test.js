// test/finder.test.js
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

async function runTests() {
  let passed = 0;
  let failed = 0;
  
  const test = async (name, fn) => {
    try {
      await fn();
      console.log(`PASS: ${name}`);
      passed++;
    } catch(e) {
      console.error(`FAIL: ${name}\n`, e);
      failed++;
    }
  };

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'finder-test-'));

  try {
    await test('Recursive search for **/*.canvas.tsx', async () => {
      const { findCanvases } = await import('../lib/finder.js');
      
      await fs.mkdir(path.join(tempDir, 'project1', 'src', 'nested'), { recursive: true });
      await fs.mkdir(path.join(tempDir, 'project2', '.git'), { recursive: true });
      await fs.mkdir(path.join(tempDir, 'project2', 'node_modules'), { recursive: true });
      
      await fs.writeFile(path.join(tempDir, 'project1', 'test.canvas.tsx'), '<h1>Test1</h1>');
      await fs.writeFile(path.join(tempDir, 'project1', 'src', 'nested', 'deep.canvas.tsx'), '// @title Deep Canvas\n<h1>Deep</h1>');
      await fs.writeFile(path.join(tempDir, 'project2', '.git', 'ignore.canvas.tsx'), '<h1>Ignore</h1>');
      await fs.writeFile(path.join(tempDir, 'project2', 'node_modules', 'ignore2.canvas.tsx'), '<h1>Ignore2</h1>');
      
      const results = await findCanvases(tempDir);
      
      assert.equal(results.length, 2);
      assert.ok(results.some(r => r.path.endsWith('test.canvas.tsx') && r.title === 'Test1'));
      assert.ok(results.some(r => r.path.endsWith('deep.canvas.tsx') && r.title === 'Deep Canvas'));
    });

    await test('Non-existent directory handling', async () => {
      const { findCanvases } = await import('../lib/finder.js');
      const results = await findCanvases(path.join(tempDir, 'does-not-exist'));
      assert.deepEqual(results, []);
    });
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }

  if (failed > 0) process.exit(1);
  process.exit(0);
}

runTests();
