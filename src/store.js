
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import shoppingReducer from './features/shoppingSlice';
<<<<<<< HEAD
=======
import authReducer from './Redux/authSlice';
>>>>>>> 754f0b21be206ec11985b65a6a13897a2801762b

// Configure the store
const store = configureStore({
  reducer: {
    auth: authReducer,
    shopping: shoppingReducer,
<<<<<<< HEAD
  },

});

export default store;

=======
    auth: authReducer,
  },
});
>>>>>>> 754f0b21be206ec11985b65a6a13897a2801762b
