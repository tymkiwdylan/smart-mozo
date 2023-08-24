// restaurantSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantState {
  restaurant: Restaurant;
}

const initialState: RestaurantState = {
  restaurant: {
    id: 0,
    restaurant_name: '',
    menu: [],
    waiters: [],
    cooks: [],
    tables: [],
  },
};

// Try to load the restaurant data from local storage
const storedRestaurant = localStorage.getItem('restaurant');
if (storedRestaurant) {
  initialState.restaurant = JSON.parse(storedRestaurant);
}

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.restaurant = action.payload;
      // Save the updated restaurant data to local storage
      localStorage.setItem('restaurant', JSON.stringify(action.payload));
    },
  },
});

export const { setRestaurant } = restaurantSlice.actions;

export default restaurantSlice.reducer;
