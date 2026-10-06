// test/mcp-server.test.js
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runTests() {
  let passed = 0, failed = 0;
  const test = async (name, fn) => {
    try { await fn(); console.log(`PASS: ${name}`); passed++; }
    catch(e) { console.error(`FAIL: ${name}\n`, e); failed++; }
  };

  const executeServerRaw = (inputStr, expectedId) => new Promise((resolve, reject) => {
    const child = spawn('node', [path.join(__dirname, '../bin/mcp-server.js')]);
    let out = '';
    child.stdout.on('data', d => {
      out += d.toString();
      if (!expectedId || out.includes(`"id":${expectedId}`) || out.includes(`"id":null`)) child.kill();
    });
    child.on('close', () => resolve(out));
    child.on('error', reject);
    child.stdin.write(inputStr);
  });

  const callMcp = async (inputs) => {
    const stdout = await executeServerRaw(inputs.map(i => JSON.stringify(i)).join('\n') + '\n', inputs[inputs.length - 1].id);
    return stdout.trim().split('\n').filter(Boolean).map(l => JSON.parse(l));
  };

  await test('init', async () => {
    const res = await callMcp([{ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2024-11-05', capabilities: {} } }]);
    assert.ok(res[0].result.protocolVersion === '2024-11-05');
  });

  await test('list', async () => {
    const res = await callMcp([{ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} }]);
    assert.ok(res[0].result.tools.some(t => t.name === 'list_agent_canvases'));
  });

  await test('invalid method', async () => {
    const res = await callMcp([{ jsonrpc: '2.0', id: 3, method: 'invalid/method', params: {} }]);
    assert.equal(res[0].error.code, -32601);
  });

  await test('parse err', async () => {
    const out = await executeServerRaw('invalid json\n', null);
    const res = out.trim().split('\n').filter(Boolean).map(l => JSON.parse(l))[0];
    assert.equal(res.error.code, -32700);
  });

  await test('invalid tool', async () => {
    const res = await callMcp([{ jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'unknown_tool' } }]);
    assert.equal(res[0].error.code, -32602);
  });

  await test('list_agent_canvases', async () => {
    const res = await callMcp([{ jsonrpc: '2.0', id: 5, method: 'tools/call', params: { name: 'list_agent_canvases' } }]);
    assert.ok(res[0].result.content[0].text);
  });

  await test('render_agent_canvas error', async () => {
    const res = await callMcp([{ jsonrpc: '2.0', id: 6, method: 'tools/call', params: { name: 'render_agent_canvas', arguments: { file: undefined } } }]);
    assert.equal(res[0].result.isError, true);
  });

  if (failed > 0) process.exit(1);
  process.exit(0);
}

runTests();
