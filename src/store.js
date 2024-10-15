import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import shoppingReducer from './features/shoppingSlice';

// Configure the store
const store = configureStore({
  reducer: {
    auth: authReducer,
    shopping: shoppingReducer,
  },

});

export default store;

