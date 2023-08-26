
import { ThunkAction} from 'redux-thunk';
import { AnyAction } from 'redux';
import { setRestaurant } from './restaurantSlice';
import { RootState } from './store';

export const fetchRestaurantData = (restaurantId: number): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
  try {
    // Simulate fetching data from an API
    const response = await fetch(`http://127.0.0.1:5000/api/restaurant/get-restaurant/${restaurantId}`);
    const data = await response.json();
    
    // Dispatch the setRestaurant action to update the state
    dispatch(setRestaurant(data['data']));
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
  }
};
