// restaurantSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NameState {
  name: string;
}

const initialState: NameState = {
  name: '',
};

// Try to load the restaurant data from local storage
const storedName = localStorage.getItem('name');
if (storedName) {
  initialState.name = JSON.parse(storedName);
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
  },
});

export const { setOrderName} = nameSlice.actions;

export default nameSlice.reducer;
