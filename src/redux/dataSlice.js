// src/redux/slices/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk for fetching data
// We are using a public API for testing purposes: jsonplaceholder
export const fetchPosts = createAsyncThunk(
  'data/fetchPosts',
  async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
    return response.data;
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
