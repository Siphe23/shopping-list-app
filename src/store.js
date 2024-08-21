import { configureStore } from '@reduxjs/toolkit';
import shoppingReducer from './features/shoppingSlice';
import authReducer from './Redux/authSlice'; // Ensure the path is correct

export const store = configureStore({
  reducer: {
    shopping: shoppingReducer,
    auth: authReducer, // Add auth reducer here
  },
  // No need to manually add thunk, it's included by default
});

