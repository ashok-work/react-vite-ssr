// src/App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter';
import { HelmetProvider } from "react-helmet-async";

export function App({ store, routerProps, helmetContext = {} }) {
  return (
    <HelmetProvider context={helmetContext}>
      <Provider store={store}>
        {/* routerProps is used to pass location to StaticRouter on server */}
        <AppRouter {...routerProps} />
      </Provider>
    </HelmetProvider>
  );
}
