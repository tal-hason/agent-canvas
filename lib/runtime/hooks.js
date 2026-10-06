// lib/runtime/hooks.js
import React, { useState, useEffect } from 'react';

export function useHostTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return { theme, isDark: theme === 'dark' };
}

export function useCanvasAction(actionName, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (event.data?.type === actionName) handler(event.data.payload);
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [actionName, handler]);
}

export function useCanvasState(key, initialValue) {
  const [val, setVal] = useState(initialValue);
  return [val, setVal];
}
