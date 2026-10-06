// lib/runtime/data.js
import React, { useState } from 'react';

export function Table({ headers = [], rows = [], style = {}, ...props }) {
  return React.createElement('div', { style: { overflowX: 'auto', width: '100%', borderRadius: '6px', border: '1px solid var(--canvas-border, rgba(128,128,128,0.18))', ...style } },
    React.createElement('table', { ...props, style: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' } },
      headers && headers.length > 0 && React.createElement('thead', null,
        React.createElement('tr', { style: { background: 'var(--canvas-card, rgba(128,128,128,0.08))', borderBottom: '1px solid var(--canvas-border, rgba(128,128,128,0.18))' } },
          headers.map((h, i) => React.createElement('th', { key: i, style: { padding: '10px 14px', fontWeight: 600 } }, h))
        )
      ),
      React.createElement('tbody', null,
        rows.map((row, rIdx) => React.createElement('tr', {
          key: rIdx,
          style: { borderBottom: rIdx < rows.length - 1 ? '1px solid var(--canvas-border, rgba(128,128,128,0.1))' : 'none' }
        },
          Array.isArray(row) ? row.map((cell, cIdx) => React.createElement('td', { key: cIdx, style: { padding: '10px 14px' } }, cell)) : null
        ))
      )
    )
  );
}

export function DiffStats({ additions = 0, deletions = 0, style = {} }) {
  return React.createElement('div', { style: { display: 'inline-flex', gap: '8px', fontSize: '12px', fontWeight: 600, ...style } },
    React.createElement('span', { style: { color: '#10b981' } }, `+${additions}`),
    React.createElement('span', { style: { color: '#ef4444' } }, `-${deletions}`)
  );
}

export function DiffView({ oldText = '', newText = '', style = {} }) {
  return React.createElement('div', { style: { fontFamily: 'monospace', fontSize: '12px', padding: '12px', background: 'rgba(128,128,128,0.06)', borderRadius: '6px', ...style } },
    oldText && React.createElement('div', { style: { color: '#ef4444' } }, `- ${oldText}`),
    newText && React.createElement('div', { style: { color: '#10b981' } }, `+ ${newText}`)
  );
}

export function TodoList({ items = [], onToggle, style = {} }) {
  const [list, setList] = useState(items);
  const handleToggle = (idx) => {
    const updated = list.map((item, i) => i === idx ? { ...item, completed: !item.completed } : item);
    setList(updated);
    if (onToggle) onToggle(updated);
  };
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', ...style } },
    list.map((it, idx) => React.createElement('label', {
      key: idx, style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }
    },
      React.createElement('input', { type: 'checkbox', checked: !!it.completed, onChange: () => handleToggle(idx) }),
      React.createElement('span', { style: { textDecoration: it.completed ? 'line-through' : 'none', opacity: it.completed ? 0.6 : 1 } }, it.label || it.text || it)
    ))
  );
}

export function TodoListCard({ title = 'Checklist', items = [], ...props }) {
  return React.createElement('div', {
    style: { border: '1px solid var(--canvas-border, rgba(128,128,128,0.2))', borderRadius: '8px', padding: '16px', background: 'var(--canvas-card, rgba(128,128,128,0.05))' }
  },
    React.createElement('div', { style: { fontWeight: 600, marginBottom: '12px' } }, title),
    React.createElement(TodoList, { items, ...props })
  );
}
