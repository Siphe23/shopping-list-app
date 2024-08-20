import { configureStore } from '@reduxjs/toolkit';
import shoppingReducer from './features/shoppingSlice';
import { thunk } from 'redux-thunk'; // Named export from redux-thunk

export const store = configureStore({
  reducer: {
    shopping: shoppingReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
