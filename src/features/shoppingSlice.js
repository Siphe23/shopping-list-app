// shoppingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define async thunk to fetch shopping list
export const fetchShoppingList = createAsyncThunk('shopping/fetchShoppingList', async () => {
  const response = await axios.get('/shoppingList');
  return response.data;
});

// Define async thunk to delete item
export const deleteItemFromDb = createAsyncThunk('shopping/deleteItemFromDb', async (id) => {
  await axios.delete(`/shoppingList/${id}`);
  return id;
});

// Define async thunk to add item
export const addItemToDb = createAsyncThunk('shopping/addItemToDb', async (newItem) => {
  const response = await axios.post('/shoppingList', newItem);
  return response.data;
});

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
      const { index, updatedItem } = action.payload;
      state.shoppingList[index] = updatedItem;
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
      .addCase(deleteItemFromDb.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(deleteItemFromDb.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.shoppingList = state.shoppingList.filter(item => item.id !== action.payload);
      })
      .addCase(deleteItemFromDb.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addItemToDb.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(addItemToDb.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.shoppingList.push(action.payload);
      })
      .addCase(addItemToDb.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setEditIndex, editItem } = shoppingSlice.actions;
export default shoppingSlice.reducer;
