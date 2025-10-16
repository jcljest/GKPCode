import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App.jsx';

if (typeof globalThis.__firebase_config === 'undefined') {
  globalThis.__firebase_config = '{}';
}

const html = renderToString(
  React.createElement(MemoryRouter, null, React.createElement(App))
);

console.log('Rendered length:', html.length);
