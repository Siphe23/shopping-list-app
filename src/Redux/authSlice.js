import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.get(`${baseURL}/users?email=${email}&password=${password}`);
    if (response.data.length > 0) {
      return response.data[0]; 
    } else {
      return thunkAPI.rejectWithValue('Invalid email or password');
    }
  } catch (error) {
    return thunkAPI.rejectWithValue('Login failed');
  }
});

export const signupUser = createAsyncThunk('auth/signupUser', async ({ username, email, password }, thunkAPI) => {
  try {
    const userExists = await axios.get(`${baseURL}/users?email=${email}`);
    if (userExists.data.length > 0) {
      return thunkAPI.rejectWithValue('User already exists');
    }

    const response = await axios.post(`${baseURL}/users`, { username, email, password });
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
