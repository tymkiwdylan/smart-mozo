// utils.ts

import { RootState } from '../store/store';

export const getRestaurant = (state: RootState): Restaurant | null => {
  return state.restaurant.restaurant;
};
