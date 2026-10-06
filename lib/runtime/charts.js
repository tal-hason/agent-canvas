// lib/runtime/charts.js
import React from 'react';

const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export function BarChart({ data = [], height = 160, style = {} }) {
  if (!data || data.length === 0) return React.createElement('div', { style: { height, ...style } });
  const max = Math.max(...data.map(d => (typeof d === 'object' ? d.value : d)), 1);
  return React.createElement('div', {
    style: { display: 'flex', alignItems: 'flex-end', gap: '8px', height: `${height}px`, width: '100%', padding: '10px 0', boxSizing: 'border-box', ...style }
  },
    data.map((d, i) => {
      const val = typeof d === 'object' ? d.value : d;
      const label = typeof d === 'object' ? d.label : '';
      const pct = Math.max(4, (val / max) * 100);
      const col = colors[i % colors.length];
      return React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '4px' } },
        React.createElement('div', { title: `${val}`, style: { width: '100%', height: `${pct}%`, background: col, borderRadius: '4px 4px 0 0', transition: 'height 0.3s' } }),
        label && React.createElement('div', { style: { fontSize: '11px', opacity: 0.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' } }, label)
      );
    })
  );
}

export function LineChart({ data = [], height = 160, style = {} }) {
  if (!data || data.length < 2) return React.createElement('div', { style: { height, ...style } });
  const values = data.map(d => typeof d === 'object' ? d.value : d);
  const min = Math.min(...values);
  const max = Math.max(...values, min + 1);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 100 - ((v - min) / (max - min)) * 90 - 5;
    return `${x},${y}`;
  }).join(' ');

  return React.createElement('svg', {
    viewBox: '0 0 100 100', preserveAspectRatio: 'none',
    style: { width: '100%', height: `${height}px`, overflow: 'visible', ...style }
  },
    React.createElement('polyline', { fill: 'none', stroke: '#3b82f6', strokeWidth: '2.5', points: pts })
  );
}

export function PieChart({ data = [], size = 140, style = {} }) {
  if (!data || data.length === 0) return React.createElement('div', { style: { width: size, height: size, ...style } });
  const total = data.reduce((acc, d) => acc + (typeof d === 'object' ? d.value : d), 0) || 1;
  let accumulated = 0;
  const gradient = data.map((d, i) => {
    const val = typeof d === 'object' ? d.value : d;
    const start = (accumulated / total) * 360;
    accumulated += val;
    const end = (accumulated / total) * 360;
    const col = colors[i % colors.length];
    return `${col} ${start}deg ${end}deg`;
  }).join(', ');

  return React.createElement('div', {
    style: {
      width: `${size}px`, height: `${size}px`, borderRadius: '50%',
      background: `conic-gradient(${gradient})`, ...style
    }
  });
}
