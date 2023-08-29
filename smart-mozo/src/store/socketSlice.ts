// socketSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketState {
  orders : Order[];
  isConnecting: boolean;
  isConnected: boolean;
}

const initialState: SocketState = {
    orders: [],
    isConnected: false,
    isConnecting: false,
};

const storedSocket = localStorage.getItem('socket');
if (storedSocket){
    initialState.orders = JSON.parse(storedSocket).orders;
}

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    startConnecting: (state => {
        state.isConnecting = true;
    }),
    connectionEstablished: (state => {
        state.isConnected = true;
        state.isConnecting = true;
    }),
    receiveAllOrders: ((state, action: PayloadAction<{
        orders: Order[]
      }>) => {
        state.orders = action.payload.orders;
      }),
    receiveNewOrder: ((state, action: PayloadAction<Order>) => {
        state.orders.push(action.payload);
        }),
    sendOrder: ((state, action: PayloadAction<Order>) => {
        return;
        }),
    joinRoom: ((state, action: PayloadAction<{
        restaurant_id: number,
        restaurant_name: string,
        }>) => {
        return;
        }),

  },
});

export const  socketActions = socketSlice.actions;
export default socketSlice;
