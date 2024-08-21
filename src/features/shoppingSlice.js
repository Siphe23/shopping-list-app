import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:3001';


export const fetchShoppingList = createAsyncThunk('shopping/fetchShoppingList', async () => {
  const response = await axios.get(`${baseURL}/shoppingList`);
  return response.data;
});


export const deleteItemFromDb = createAsyncThunk('shopping/deleteItemFromDb', async (id) => {
  await axios.delete(`${baseURL}/shoppingList/${id}`);
  return id;
});


export const addItemToDb = createAsyncThunk('shopping/addItemToDb', async (newItem) => {
  const response = await axios.post(`${baseURL}/shoppingList`, newItem);
  return response.data;
});


export const editItemToDb = createAsyncThunk('shopping/editItemToDb', async ({ id, updatedItem }) => {
  const response = await axios.put(`${baseURL}/shoppingList/${id}`, updatedItem);
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
      })

    
      .addCase(editItemToDb.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(editItemToDb.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
       
        const index = state.shoppingList.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.shoppingList[index] = action.payload;
        }
      })
      .addCase(editItemToDb.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});


export const { setEditIndex, editItem } = shoppingSlice.actions;
export default shoppingSlice.reducer;
