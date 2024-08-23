import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const fetchShoppingList = createAsyncThunk(
  'shopping/fetchShoppingList',
  async (_, { getState }) => {
    const state = getState();
    const userId = state.auth.user.id; 
    
    const response = await axios.get(`${baseURL}/shoppingList?userId=${userId}`);
    return response.data;
  }
);

export const deleteItemFromDb = createAsyncThunk(
  'shopping/deleteItemFromDb',
  async (id) => {
    await axios.delete(`${baseURL}/shoppingList/${id}`);
    return id;
  }
);

export const addItemToDb = createAsyncThunk(
  'shopping/addItemToDb',
  async (newItem, { getState }) => {
    const state = getState();
    const userId = state.auth.user.id;

    const response = await axios.post(`${baseURL}/shoppingList`, {
      ...newItem,
      userId,
    });
    return response.data;
  }
);

export const editItemToDb = createAsyncThunk(
  'shopping/editItemToDb',
  async ({ id, updatedItem }) => {
    const response = await axios.put(`${baseURL}/shoppingList/${id}`, updatedItem);
    return response.data;
  }
);

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState: {
    shoppingList: [],
    status: 'idle',
    error: null,
    editIndex: null,
    isLoading: false,
  },
  reducers: {
    setEditIndex(state, action) {
      state.editIndex = action.payload;
    },
    editItem(state, action) {
      const { id, updatedItem } = action.payload;
      const index = state.shoppingList.findIndex(item => item.id === id);
      if (index !== -1) {
        state.shoppingList[index] = { ...state.shoppingList[index], ...updatedItem };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingList.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchShoppingList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.shoppingList = action.payload;
      })
      .addCase(fetchShoppingList.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteItemFromDb.fulfilled, (state, action) => {
        state.shoppingList = state.shoppingList.filter(item => item.id !== action.payload);
      })
      .addCase(addItemToDb.fulfilled, (state, action) => {
        state.shoppingList.push(action.payload);
      })
      .addCase(editItemToDb.fulfilled, (state, action) => {
        const index = state.shoppingList.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.shoppingList[index] = action.payload;
        }
      });
  },
});

export const { setEditIndex, editItem } = shoppingSlice.actions;

export default shoppingSlice.reducer;
