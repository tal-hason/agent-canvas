// lib/theme-adapter.js
export function getThemeStyles() {
  return `
    :root {
      --canvas-bg: var(--background, #ffffff);
      --canvas-fg: var(--foreground, #000000);
      --canvas-card: var(--card, #f0f0f0);
      --canvas-border: var(--border, #e0e0e0);
    }
    body {
      background-color: var(--canvas-bg);
      color: var(--canvas-fg);
      font-family: sans-serif;
      margin: 0;
      padding: 0;
    }
  `;
}
