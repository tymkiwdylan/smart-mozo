
import { ThunkAction} from 'redux-thunk';
import { AnyAction } from 'redux';
import { restaurantActions, setRestaurant} from './restaurantSlice';
import { RootState } from './store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRestaurantData = (restaurantId: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
  try {
    // fetching data from an API
    const token = getState().restaurant.token;
    const response = await fetch(`http://127.0.0.1:5000/api/restaurant/get-restaurant/${restaurantId}`, {headers: {Authorization: `Bearer ${token}`}});
    const data = await response.json();
    
    // Dispatch the setRestaurant action to update the state
    dispatch(setRestaurant(data['data']));
  } catch (error: any) {
    console.error('Error fetching restaurant data:', error.response.status);
  }
};


export const setMenuItems = createAsyncThunk('restaurant/setMenu', async (menuData : MenuItem[], { dispatch }) => {
  // Similar to setToken, perform async operations and dispatch

  dispatch(restaurantActions.setMenu(menuData));

  return menuData;
});

export const setWaiters = createAsyncThunk('restaurant/setWaiters', async (waitersData: Waiter[], { dispatch }) => {
  // Similar to setToken, perform async operations and dispatch

  dispatch(restaurantActions.setWaiters(waitersData));

  return waitersData;
});

export const setTables = createAsyncThunk('restaurant/setTables', async (tablesData: Table[], { dispatch }) => {
  // Similar to setToken, perform async operations and dispatch

  dispatch(restaurantActions.setTables(tablesData));

  return tablesData;
});

export const setCooks = createAsyncThunk('restaurant/setCooks', async (cooksData: Cook[], { dispatch }) => {
  // Similar to setToken, perform async operations and dispatch

  dispatch(restaurantActions.setCooks(cooksData));

  return cooksData;
});