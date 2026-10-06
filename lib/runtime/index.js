// lib/runtime/index.js
import React, { useState, useEffect, useMemo, useRef, useReducer, useCallback } from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';

export * from './hooks.js';
export * from './layout.js';
export * from './typography.js';
export * from './containers.js';
export * from './indicators.js';
export * from './controls.js';
export * from './data.js';
export * from './charts.js';

export { React, ReactDOM, ReactDOMClient, useState, useEffect, useMemo, useRef, useReducer, useCallback };

import * as hooks from './hooks.js';
import * as layout from './layout.js';
import * as typography from './typography.js';
import * as containers from './containers.js';
import * as indicators from './indicators.js';
import * as controls from './controls.js';
import * as data from './data.js';
import * as charts from './charts.js';

const allExports = {
  ...hooks, ...layout, ...typography, ...containers,
  ...indicators, ...controls, ...data, ...charts,
  React, ReactDOM, ReactDOMClient, useState, useEffect, useMemo, useRef, useReducer, useCallback
};

export const dist_exports = allExports;
export default allExports;
