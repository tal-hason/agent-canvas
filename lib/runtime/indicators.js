// lib/runtime/indicators.js
import React from 'react';

const badgeColors = {
  info: { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6' },
  success: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981' },
  warning: { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b' },
  danger: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444' },
  neutral: { bg: 'rgba(128, 128, 128, 0.15)', text: 'inherit' }
};

export function Badge({ children, tone = 'neutral', style = {}, ...props }) {
  const c = badgeColors[tone] || badgeColors.neutral;
  return React.createElement('span', {
    ...props,
    style: {
      display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: '4px',
      fontSize: '11px', fontWeight: 600, background: c.bg, color: c.text, textTransform: 'uppercase', ...style
    }
  }, children);
}

export function Pill({ children, tone = 'neutral', style = {}, ...props }) {
  const c = badgeColors[tone] || badgeColors.neutral;
  return React.createElement('span', {
    ...props,
    style: {
      display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: '999px',
      fontSize: '12px', fontWeight: 500, background: c.bg, color: c.text, ...style
    }
  }, children);
}

export function Tag({ children, style = {}, ...props }) {
  return React.createElement(Badge, { tone: 'neutral', style: { borderRadius: '2px', ...style }, ...props }, children);
}

export function Chip({ label, onRemove, style = {}, ...props }) {
  return React.createElement('span', {
    ...props,
    style: {
      display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '12px',
      fontSize: '12px', background: 'rgba(128,128,128,0.15)', ...style
    }
  }, label, onRemove && React.createElement('span', { onClick: onRemove, style: { cursor: 'pointer', opacity: 0.7 } }, '×'));
}

export function Swatch({ color, label, style = {}, ...props }) {
  return React.createElement('div', { ...props, style: { display: 'inline-flex', alignItems: 'center', gap: '6px', ...style } },
    React.createElement('div', { style: { width: '14px', height: '14px', borderRadius: '3px', background: color, border: '1px solid rgba(128,128,128,0.2)' } }),
    label && React.createElement('span', { style: { fontSize: '12px' } }, label)
  );
}

export function UsageBar({ value = 0, max = 100, tone = 'info', style = {}, ...props }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const c = badgeColors[tone] || badgeColors.info;
  return React.createElement('div', {
    ...props,
    style: { width: '100%', height: '8px', background: 'rgba(128,128,128,0.15)', borderRadius: '4px', overflow: 'hidden', ...style }
  }, React.createElement('div', { style: { width: `${pct}%`, height: '100%', background: c.text, transition: 'width 0.3s' } }));
}
