import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:3001/users';

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, thunkAPI) => {
  try {
    // Fetch by email only, as JSON Server doesn't support filtering multiple fields
    const response = await axios.get(`${baseURL}?email=${email}`);
    
    // Check if the user exists and the password matches
    const user = response.data.find(user => user.password === password);
    if (user) {
      return user; 
    } else {
      return thunkAPI.rejectWithValue('Invalid email or password');
    }
  } catch (error) {
    return thunkAPI.rejectWithValue('Login failed');
  }
});

export const signupUser = createAsyncThunk('auth/signupUser', async ({ username, email, password }, thunkAPI) => {
  try {
    const userExists = await axios.get(`${baseURL}?email=${email}`);
    if (userExists.data.length > 0) {
      return thunkAPI.rejectWithValue('User already exists');
    }

    const response = await axios.post(baseURL, { username, email, password });
    return response.data; 
  } catch (error) {
    return thunkAPI.rejectWithValue('Signup failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
