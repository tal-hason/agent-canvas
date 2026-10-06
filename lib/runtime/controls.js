// lib/runtime/controls.js
import React from 'react';

const btnStyles = {
  primary: { bg: '#3b82f6', text: '#ffffff', border: 'none' },
  secondary: { bg: 'rgba(128,128,128,0.12)', text: 'inherit', border: '1px solid var(--canvas-border, rgba(128,128,128,0.2))' },
  danger: { bg: '#ef4444', text: '#ffffff', border: 'none' },
  ghost: { bg: 'transparent', text: 'inherit', border: 'none' }
};

export function Button({ children, variant = 'secondary', onClick, disabled, style = {}, ...props }) {
  const b = btnStyles[variant] || btnStyles.secondary;
  return React.createElement('button', {
    ...props,
    onClick, disabled,
    style: {
      padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 500,
      background: b.bg, color: b.text, border: b.border, cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1, transition: 'background 0.2s', ...style
    }
  }, children);
}

export function IconButton({ icon, children, onClick, style = {}, ...props }) {
  return React.createElement(Button, { variant: 'ghost', onClick, style: { padding: '4px 8px', ...style }, ...props }, icon || children);
}

export function TextInput({ value, onChange, placeholder, style = {}, ...props }) {
  return React.createElement('input', {
    ...props,
    type: 'text', value, onChange, placeholder,
    style: {
      padding: '7px 12px', borderRadius: '6px', border: '1px solid var(--canvas-border, rgba(128,128,128,0.25))',
      background: 'var(--canvas-input-bg, rgba(128,128,128,0.06))', color: 'inherit', fontSize: '13px', width: '100%', boxSizing: 'border-box', ...style
    }
  });
}

export function TextArea({ value, onChange, placeholder, rows = 3, style = {}, ...props }) {
  return React.createElement('textarea', {
    ...props,
    value, onChange, placeholder, rows,
    style: {
      padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--canvas-border, rgba(128,128,128,0.25))',
      background: 'var(--canvas-input-bg, rgba(128,128,128,0.06))', color: 'inherit', fontSize: '13px', width: '100%', boxSizing: 'border-box', ...style
    }
  });
}

export function Select({ value, onChange, options = [], style = {}, ...props }) {
  return React.createElement('select', {
    ...props,
    value, onChange,
    style: {
      padding: '7px 12px', borderRadius: '6px', border: '1px solid var(--canvas-border, rgba(128,128,128,0.25))',
      background: 'var(--canvas-card, rgba(128,128,128,0.08))', color: 'inherit', fontSize: '13px', cursor: 'pointer', ...style
    }
  }, options.map((opt, i) => React.createElement('option', { key: i, value: typeof opt === 'object' ? opt.value : opt }, typeof opt === 'object' ? opt.label : opt)));
}

export function Checkbox({ checked, onChange, label, style = {}, ...props }) {
  return React.createElement('label', { style: { display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', ...style } },
    React.createElement('input', { type: 'checkbox', checked, onChange: (e) => onChange && onChange(e.target.checked), ...props }),
    label && React.createElement('span', null, label)
  );
}

export function Toggle({ checked, onChange, label, style = {}, ...props }) {
  return React.createElement('label', { style: { display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', ...style } },
    React.createElement('input', { type: 'checkbox', role: 'switch', checked, onChange: (e) => onChange && onChange(e.target.checked), ...props }),
    label && React.createElement('span', null, label)
  );
}
