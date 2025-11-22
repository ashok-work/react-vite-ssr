// src/entry-client.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStoreInstance } from './redux/store';
import { App } from './App';

// 1. Retrieve the preloaded state sent from the server
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__; // Clean up global window object

// 2. Create the Redux store with the initial state
const store = createStoreInstance(preloadedState);

// 3. Use hydrateRoot to attach client-side logic to the server-rendered HTML
ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <App store={store} />
);
