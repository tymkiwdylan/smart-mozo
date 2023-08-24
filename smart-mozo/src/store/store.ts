// store.ts

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import restaurantReducer from './restaurantSlice';
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
    key: 'root',
    storage,
  };
  

export const store = configureStore({
  reducer: {
    restaurant: persistReducer(persistConfig, restaurantReducer),
  },
  middleware: [thunk], // Add thunk middleware
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
