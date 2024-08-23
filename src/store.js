// store.js
import { configureStore } from '@reduxjs/toolkit';
import shoppingReducer from './features/shoppingSlice';
import authReducer from './Redux/authSlice';

export const store = configureStore({
  reducer: {
    shopping: shoppingReducer,
    auth: authReducer,
  },
});
