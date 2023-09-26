// restaurantSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantState {
  restaurant: Restaurant;
  token: string;
}

const initialState: RestaurantState = {
  restaurant: {
    id: 0,
    restaurant_name: '',
    menu: [],
    waiters: [],
    cooks: [],
    tables: [],
    ingridients: [],
  },
  token: '',
};

// Try to load the restaurant data from local storage
const storedRestaurant = localStorage.getItem('restaurant');
const storedToken = localStorage.getItem('token');
if (storedRestaurant) {
  initialState.restaurant = JSON.parse(storedRestaurant);
}
if (storedToken) {
  initialState.token = storedToken;
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
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setMenu: ((state, action: PayloadAction<MenuItem[]>) => {
      state.restaurant.menu = action.payload;
      localStorage.setItem(
        'restaurant',
        JSON.stringify(state.restaurant)
      );
    }),
    setWaiters: (state, action: PayloadAction<Waiter[]>) => {
      state.restaurant.waiters = action.payload;
      localStorage.setItem(
        'restaurant',
        JSON.stringify(state.restaurant)
      );
    },
    setTables: (state, action: PayloadAction<Table[]>) => {
      state.restaurant.tables = action.payload;
      localStorage.setItem(
        'restaurant',
        JSON.stringify(state.restaurant)
      );
    },
    setCooks: (state, action: PayloadAction<Cook[]>) => {
      state.restaurant.cooks = action.payload;
      localStorage.setItem(
        'restaurant',
        JSON.stringify(state.restaurant)
      );
    },

    setWaiterTables: (state, action: PayloadAction<{ waiterId: number, tables: Table[] }>) => {
      const { waiterId, tables } = action.payload;
      const waiter = state.restaurant.waiters.find(w => w.id === waiterId);
      if (waiter) {
        waiter.tables = tables;
        localStorage.setItem(
          'restaurant',
          JSON.stringify(state.restaurant)
        );
      }
    }

  },
});

export const { setRestaurant, setToken, setMenu, setCooks, setTables, setWaiters, setWaiterTables } = restaurantSlice.actions;
export const restaurantActions = restaurantSlice.actions;

export default restaurantSlice.reducer;
