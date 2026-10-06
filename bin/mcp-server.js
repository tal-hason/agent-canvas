#!/usr/bin/env node
// bin/mcp-server.js
import readline from 'readline';
import { compileCanvas } from '../lib/compiler.js';
import { getAllCanvases } from '../lib/finder.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + '\n');
}

process.stdin.on('close', () => process.exit(0));

rl.on('line', async (line) => {
  if (!line.trim()) return;
  let req;
  try {
    req = JSON.parse(line);
  } catch (e) {
    return send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } });
  }
  
  if (req.method === 'initialize') {
    send({
      jsonrpc: '2.0', id: req.id,
      result: { protocolVersion: '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 'agent-canvas', version: '1.0.0' } }
    });
  } else if (req.method === 'notifications/initialized') {
    // noop
  } else if (req.method === 'tools/list') {
    send({
      jsonrpc: '2.0', id: req.id,
      result: {
        tools: [
          { name: 'list_agent_canvases', description: 'List all available Canvases', inputSchema: { type: 'object', properties: {} } },
          { name: 'render_agent_canvas', description: 'Render a Canvas (.canvas.tsx) to HTML', inputSchema: { type: 'object', properties: { file: { type: 'string' } }, required: ['file'] } },
          { name: 'list_cursor_canvases', description: 'Alias for list_agent_canvases', inputSchema: { type: 'object', properties: {} } },
          { name: 'render_cursor_canvas', description: 'Alias for render_agent_canvas', inputSchema: { type: 'object', properties: { file: { type: 'string' } }, required: ['file'] } }
        ]
      }
    });
  } else if (req.method === 'tools/call') {
    const toolName = req.params?.name;
    try {
      if (toolName === 'list_agent_canvases' || toolName === 'list_cursor_canvases') {
        const list = getAllCanvases();
        send({ jsonrpc: '2.0', id: req.id, result: { content: [{ type: 'text', text: JSON.stringify(list) }] } });
      } else if (toolName === 'render_agent_canvas' || toolName === 'render_cursor_canvas') {
        const html = await compileCanvas(req.params?.arguments?.file);
        send({ jsonrpc: '2.0', id: req.id, result: { content: [{ type: 'text', text: html }] } });
      } else {
        send({ jsonrpc: '2.0', id: req.id, error: { code: -32602, message: 'Invalid params: Unknown tool' } });
      }
    } catch (e) {
      send({ jsonrpc: '2.0', id: req.id, result: { isError: true, content: [{ type: 'text', text: e.message }] } });
    }
  } else {
    if (req.id) send({ jsonrpc: '2.0', id: req.id, error: { code: -32601, message: 'Method not found' }});
  }
});
