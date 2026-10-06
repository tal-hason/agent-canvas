// lib/runtime/containers.js
import React from 'react';

const toneColors = {
  info: { border: '#3b82f6', bg: 'rgba(59, 130, 246, 0.08)', text: '#3b82f6' },
  success: { border: '#10b981', bg: 'rgba(16, 185, 129, 0.08)', text: '#10b981' },
  warning: { border: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)', text: '#f59e0b' },
  danger: { border: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)', text: '#ef4444' },
  neutral: { border: 'var(--canvas-border, rgba(128,128,128,0.2))', bg: 'transparent', text: 'inherit' }
};

export function Card({ children, title, style = {}, ...props }) {
  return React.createElement('div', {
    ...props,
    style: {
      background: 'var(--canvas-card, rgba(128,128,128,0.05))',
      border: '1px solid var(--canvas-border, rgba(128,128,128,0.15))',
      borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box', ...style
    }
  }, title && React.createElement(CardHeader, { title }), children);
}

export function CardHeader({ title, subtitle, action, style = {}, ...props }) {
  return React.createElement('div', {
    ...props,
    style: {
      padding: '12px 16px', borderBottom: '1px solid var(--canvas-border, rgba(128,128,128,0.12))',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...style
    }
  }, React.createElement('div', null,
    React.createElement('div', { style: { fontWeight: 600, fontSize: '15px' } }, title),
    subtitle && React.createElement('div', { style: { fontSize: '12px', opacity: 0.7 } }, subtitle)
  ), action);
}

export function CardBody({ children, p = 16, style = {}, ...props }) {
  return React.createElement('div', { ...props, style: { padding: `${p}px`, flex: 1, ...style } }, children);
}

export function CardFooter({ children, style = {}, ...props }) {
  return React.createElement('div', {
    ...props,
    style: { padding: '10px 16px', borderTop: '1px solid var(--canvas-border, rgba(128,128,128,0.12))', ...style }
  }, children);
}

export function Callout({ title, children, tone = 'info', style = {}, ...props }) {
  const c = toneColors[tone] || toneColors.info;
  return React.createElement('div', {
    ...props,
    style: {
      padding: '12px 16px', borderRadius: '6px', borderLeft: `4px solid ${c.border}`,
      background: c.bg, color: 'var(--canvas-fg, inherit)', margin: '8px 0', ...style
    }
  }, title && React.createElement('div', { style: { fontWeight: 600, marginBottom: '4px', color: c.text } }, title), children);
}

export function Stat({ label, value, change, tone = 'neutral', style = {}, ...props }) {
  const c = toneColors[tone] || toneColors.neutral;
  return React.createElement('div', {
    ...props,
    style: {
      background: 'var(--canvas-card, rgba(128,128,128,0.05))',
      border: '1px solid var(--canvas-border, rgba(128,128,128,0.15))',
      borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', ...style
    }
  },
    React.createElement('div', { style: { fontSize: '12px', opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.5px' } }, label),
    React.createElement('div', { style: { fontSize: '24px', fontWeight: 700, color: c.text !== 'inherit' ? c.text : undefined } }, value),
    change && React.createElement('div', { style: { fontSize: '12px', opacity: 0.8 } }, change)
  );
}
