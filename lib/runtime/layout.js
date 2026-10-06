// lib/runtime/layout.js
import React, { useState } from 'react';

export function Stack({ children, gap = 16, p = 0, align, justify, style = {}, ...props }) {
  return React.createElement('div', {
    ...props,
    style: {
      display: 'flex', flexDirection: 'column', gap: `${gap}px`, padding: p ? `${p}px` : undefined,
      alignItems: align, justifyContent: justify, boxSizing: 'border-box', width: '100%', ...style
    }
  }, children);
}

export function Row({ children, gap = 8, align = 'center', justify, style = {}, ...props }) {
  return React.createElement('div', {
    ...props,
    style: {
      display: 'flex', flexDirection: 'row', gap: `${gap}px`, alignItems: align,
      justifyContent: justify, boxSizing: 'border-box', width: '100%', ...style
    }
  }, children);
}

export function Grid({ children, columns, cols = 3, gap = 16, style = {}, ...props }) {
  const c = columns || cols;
  return React.createElement('div', {
    ...props,
    style: {
      display: 'grid', gridTemplateColumns: typeof c === 'number' ? `repeat(${c}, minmax(0, 1fr))` : c,
      gap: `${gap}px`, boxSizing: 'border-box', width: '100%', ...style
    }
  }, children);
}

export function Divider({ style = {}, ...props }) {
  return React.createElement('hr', {
    ...props,
    style: { border: 'none', borderTop: '1px solid var(--canvas-border, rgba(128,128,128,0.2))', margin: '8px 0', width: '100%', ...style }
  });
}

export function Spacer({ size = 16, style = {} }) {
  return React.createElement('div', { style: { flex: 1, minHeight: `${size}px`, minWidth: `${size}px`, ...style } });
}

export function CollapsibleSection({ title, children, defaultOpen = false, style = {} }) {
  const [open, setOpen] = useState(defaultOpen);
  return React.createElement('div', { style: { border: '1px solid var(--canvas-border, rgba(128,128,128,0.2))', borderRadius: '8px', overflow: 'hidden', ...style } },
    React.createElement('div', {
      onClick: () => setOpen(!open),
      style: { padding: '12px 16px', background: 'var(--canvas-card, rgba(128,128,128,0.05))', cursor: 'pointer', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }
    }, title, open ? '▲' : '▼'),
    open && React.createElement('div', { style: { padding: '16px' } }, children)
  );
}
