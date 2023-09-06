// store.ts

import {  MiddlewareArray, configureStore} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import restaurantReducer from './restaurantSlice';
import storage from 'redux-persist/lib/storage';
import nameSlice from './nameSlice';
import socketSlice from './socketSlice';
import {socketMiddleware } from './socketMiddleware';


const persistConfig = {
  key: 'root',
  storage,
};

// Create a socket instance


export const store = configureStore({
  reducer: {
    restaurant: persistReducer(persistConfig, restaurantReducer),
    orderName: persistReducer(persistConfig, nameSlice),
    socket: persistReducer(persistConfig ,socketSlice.reducer),
  },
  middleware: new MiddlewareArray().concat(thunk, socketMiddleware),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
