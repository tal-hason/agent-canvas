// lib/runtime/typography.js
import React from 'react';

const tones = {
  primary: 'var(--canvas-fg, inherit)',
  secondary: 'var(--canvas-secondary, rgba(128,128,128,0.75))',
  neutral: 'var(--canvas-secondary, rgba(128,128,128,0.75))',
  danger: '#e5484d',
  success: '#30a46c',
  warning: '#f76808'
};

export function H1({ children, style = {}, ...props }) {
  return React.createElement('h1', {
    ...props,
    style: { margin: '0 0 8px 0', fontSize: '24px', fontWeight: 650, color: 'var(--canvas-fg, inherit)', ...style }
  }, children);
}

export function H2({ children, style = {}, ...props }) {
  return React.createElement('h2', {
    ...props,
    style: { margin: '0 0 6px 0', fontSize: '18px', fontWeight: 600, color: 'var(--canvas-fg, inherit)', ...style }
  }, children);
}

export function H3({ children, style = {}, ...props }) {
  return React.createElement('h3', {
    ...props,
    style: { margin: '0 0 4px 0', fontSize: '15px', fontWeight: 600, color: 'var(--canvas-fg, inherit)', ...style }
  }, children);
}

export function Text({ children, tone = 'primary', size = '14px', weight = 'normal', style = {}, ...props }) {
  const color = tones[tone] || tones.primary;
  return React.createElement('span', {
    ...props,
    style: { fontSize: size, fontWeight: weight, color, lineHeight: '1.5', ...style }
  }, children);
}

export function Code({ children, style = {}, ...props }) {
  return React.createElement('code', {
    ...props,
    style: {
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: '0.88em', padding: '2px 6px', borderRadius: '4px',
      background: 'var(--canvas-code-bg, rgba(128,128,128,0.15))',
      color: 'var(--canvas-fg, inherit)', ...style
    }
  }, children);
}

export function Link({ href, children, style = {}, ...props }) {
  return React.createElement('a', {
    ...props,
    href, target: '_blank', rel: 'noreferrer',
    style: { color: 'var(--canvas-accent, #3b82f6)', textDecoration: 'none', ...style }
  }, children);
}
