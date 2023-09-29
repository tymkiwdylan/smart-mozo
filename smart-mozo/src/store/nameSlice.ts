// restaurantSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NameState {
  name: string;
  cart: [];
}

const initialState: NameState = {
  name: '',
  cart: [],
};

// Try to load the restaurant data from local storage
const storedName = localStorage.getItem('name');
const storedCart = localStorage.getItem('cart');
if (storedName) {
  initialState.name = JSON.parse(storedName);
  initialState.cart = JSON.parse(storedCart as string);
}

const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    setOrderName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      // Save the updated restaurant data to local storage
      localStorage.setItem('order', JSON.stringify(action.payload));
    },
    setCart: (state, action: PayloadAction<[]>) => {
      state.cart = action.payload;
      localStorage.setItem('cart', JSON.stringify(action.payload));
    },
  },
});

export const { setOrderName} = nameSlice.actions;

export default nameSlice.reducer;
