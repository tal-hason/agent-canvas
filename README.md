# Agent Canvas (`agent-canvas`)

> 100% Standalone React 18 Canvas runner, UI/FE prototyping studio, and MCP server for AI coding assistants (Google Antigravity & others).

`agent-canvas` lets AI coding agents and developers compile, render, preview, and author interactive `.canvas.tsx` React artifacts **completely offline with zero external dependencies**. It is **100% standalone** — no external IDE installation or proprietary binaries required.

---

## Features

- **100% Standalone**: Completely self-contained. Runs anywhere pure Node.js is installed (Linux, macOS, Windows, CI/CD, Docker).
- **Zero-Network Transpilation**: Fast compilation using local `esbuild-wasm` with no external bundlers, dev-servers, or internet connectivity required.
- **Full React 18 & UI Prototyping**: Build stateful, interactive frontend prototypes (`useState`, `useEffect`, `Table`, `Stat`, `Badge`, `Button`, `TextInput`, `Select`) with live interactive controls.
- **Complete Design System**: Built-in implementations for 45+ UI primitives (`Card`, `Grid`, `Stack`, `Row`, `BarChart`, `LineChart`, `PieChart`, `DiffView`, etc.).
- **Modern SDK**: Canvases import directly from `'agent/canvas'`.
- **Host Theme Adaptation**: CSS bridge (`useHostTheme`) dynamically mirrors dark and light IDE themes.
- **Dual Antigravity Viewport**: Renders directly as durable Antigravity side-pane **Artifacts** and inline chat widgets (`<agent-embed>`).
- **MCP Server & CLI**: Stdio JSON-RPC MCP server (`list_agent_canvases`, `render_agent_canvas`) and standalone CLI (`agent-canvas list`, `agent-canvas render`).

---

## Installation

```bash
git clone https://github.com/tal-hason/agent-canvas.git ~/Git/GitHub/agent-canvas
cd ~/Git/GitHub/agent-canvas
npm link  # or symlink bin/cli.js to ~/.local/bin/agent-canvas
```

---

## CLI Usage

### List Available Canvases
```bash
agent-canvas list
```

### Render a Canvas to Standalone HTML
```bash
agent-canvas render path/to/my.canvas.tsx --out path/to/output.html
```

---

## MCP Server Configuration

To register with Antigravity or any MCP client, add to your MCP configuration:

```json
{
  "mcpServers": {
    "agent-canvas": {
      "command": "node",
      "args": ["<path-to-agent-canvas>/bin/mcp-server.js"]
    }
  }
}
```

### Available Tools

- `list_agent_canvases`: Discovers all `.canvas.tsx` files across projects and workspace.
- `render_agent_canvas`: Compiles a target `.canvas.tsx` file into standalone, self-contained HTML.

---

## Authoring Canvases

Create a file ending in `.canvas.tsx`:

```tsx
// @title Operational Metrics Dashboard
import React, { useState } from 'react';
import {
  Stack, Row, Grid, Card, CardHeader, CardBody,
  Stat, Badge, Button, Table, Callout, H1, Text
} from 'agent/canvas';

export default function Dashboard() {
  const [active, setActive] = useState(true);

  return (
    <Stack gap={16} p={20}>
      <Row justify="space-between" align="center">
        <H1>Operational Metrics</H1>
        <Button variant="primary" onClick={() => setActive(!active)}>
          {active ? 'Pause Feed' : 'Resume Feed'}
        </Button>
      </Row>

      <Grid columns={3} gap={16}>
        <Stat label="Uptime" value="99.98%" tone="success" />
        <Stat label="P99 Latency" value="14.2ms" />
        <Stat label="Status" value={active ? 'STREAMING' : 'IDLE'} />
      </Grid>
    </Stack>
  );
}
```

---

## Testing

```bash
npm test
```

Runs all 14 automated unit and integration tests across the compiler, canvas finder, and MCP server.

---

## License

MIT © Tal Hason
