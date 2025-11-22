// src/entry-server.jsx
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStoreInstance } from './redux/store';
import { App } from './App';
import { fetchPosts } from './redux/dataSlice'; // Import the thunk

/**
 * Renders the application on the server.
 * @param {string} url The request URL
 * @returns {object} { html, preloadedState }
 */
export async function render(url) {
  // 1. Create a fresh Redux store instance for each request
  const store = createStoreInstance();
  await store.dispatch(fetchPosts()); 
  // Create a specific context object for this request
  const helmetContext = {};
  // 2. Optional: Fetch data and dispatch actions to populate the store
  // await store.dispatch(fetchDataAction()); 

  // 3. Render the app to a string, passing the store and URL for routing
  const html = ReactDOMServer.renderToString(
    <App store={store} helmetContext={helmetContext} routerProps={{ location: url }} />
  );

  // Extract the head tags from the context after rendering
  const { helmet } = helmetContext;
  // 4. Grab the initial state from the store after rendering (and data fetching)
  const preloadedState = store.getState();

  return { html, preloadedState, helmet };
}
