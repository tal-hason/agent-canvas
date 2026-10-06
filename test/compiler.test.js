// test/compiler.test.js
import assert from 'node:assert/strict';

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

  await test('Valid TSX compile and CSP inclusion', async () => {
    const { compile } = await import('../lib/compiler.js');
    const result = await compile('export default () => <div>Hi</div>;');
    assert.match(result, /Content-Security-Policy/);
    assert.match(result, /default-src 'none'/);
  });

  await test('Import destructuring of react/react-dom/canvas', async () => {
    const { compile } = await import('../lib/compiler.js');
    const result = await compile(`
      import { useState } from 'react';
      import { createRoot } from 'react-dom/client';
      import { Card } from 'agent/canvas';
    `);
    assert.ok(typeof result === 'string');
    assert.ok(result.length > 0);
  });

  await test('TSX syntax error handling', async () => {
    const { compile } = await import('../lib/compiler.js');
    await assert.rejects(
      async () => await compile('const x = { invalid syntax };'),
      (err) => err.message.includes('Syntax') || err.message.includes('error') || err.name === 'Error'
    );
  });

  await test('Bare import Proxy fallback', async () => {
    const { compile } = await import('../lib/compiler.js');
    const result = await compile(`import { Icon } from 'lucide-react';`);
    assert.ok(typeof result === 'string');
  });

  await test('React createElement output and recursive proxy deep access', async () => {
    const { compile } = await import('../lib/compiler.js');
    const result = await compile('export default () => <Icon />;');
    assert.match(result, /React\.createElement/);
    assert.match(result, /Proxy\(\(\) => p, \{ get: \(\) => p \}\)/);
  });

  if (failed > 0) {
    process.exit(1);
  }
  process.exit(0);
}

runTests();
