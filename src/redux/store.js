// src/redux/store.js (Universal store creator)
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import dataReducer from './dataSlice'; // Import the new reducer

/**
 * Creates a new Redux store instance with optional preloaded state.
 * @param {object} preloadedState 
 */
export const createStoreInstance = (preloadedState) => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      dataReducer: dataReducer,
    },
    preloadedState,
  });
};
