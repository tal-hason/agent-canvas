// lib/compiler.js
import fs from 'fs';
import esbuild from 'esbuild-wasm';
import { getRuntimeBundle } from './runtime-bundle.js';
import { getThemeStyles } from './theme-adapter.js';

export async function compile(input, options = {}) {
  const runtimeCode = await getRuntimeBundle();

  let tsCode = input;
  if (typeof input === 'string' && fs.existsSync(input)) {
    tsCode = fs.readFileSync(input, 'utf8');
  }

  const result = await esbuild.transform(tsCode, {
    loader: 'tsx',
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    format: 'cjs'
  });

  const jsCode = result.code.replace(/<\/script>/gi, '<\\/script>');
  const safeRuntime = runtimeCode.replace(/<\/script>/gi, '<\\/script>');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'self' data:; font-src * data:;">
  <style>${getThemeStyles()}</style>
</head>
<body>
  <div id="root"></div>
  <script>
    ${safeRuntime}
    const Agent = window.AgentRuntime || AgentRuntime;
    const CursorRuntime = Agent;
    const React = Agent.React;
    const ReactDOM = Agent.ReactDOMClient || Agent.ReactDOM;

    window.require = function(module) {
      if (module === 'react') return React;
      if (module === 'react-dom' || module.startsWith('react-dom/')) return ReactDOM;
      if (module === 'agent/canvas' || module === 'cursor/canvas') return Agent.dist_exports || Agent;
      const p = new Proxy(() => p, { get: () => p });
      return p;
    };

    try {
      var module = { exports: {} };
      var exports = module.exports;
      ${jsCode}
      const RootComponent = module.exports.default || module.exports.App || (typeof App !== 'undefined' ? App : null);
      if (RootComponent) {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(RootComponent));
      } else {
        document.getElementById('root').innerHTML = '<i>No default export found</i>';
      }
    } catch (e) {
      document.getElementById('root').innerHTML = '<pre style="color:red">' + e.toString() + '</pre>';
    }

    const ro = new ResizeObserver(() => {
      window.parent.postMessage({ type: 'canvas-resize', height: document.body.scrollHeight }, '*');
    });
    ro.observe(document.body);
  </script>
</body>
</html>`;
}

export const compileCanvas = compile;
