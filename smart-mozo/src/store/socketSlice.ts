// socketSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketState {
  kitchenOrders: Order[];
  waitersOrders: Order[];
  isConnecting: boolean;
  isConnected: boolean;
  hasJoinedRoom: boolean;
}

const initialState: SocketState = {
    kitchenOrders: [],
    waitersOrders: [],
    isConnected: false,
    isConnecting: false,
    hasJoinedRoom: false,
};

const storedSocket = localStorage.getItem('socket');
if (storedSocket){
    initialState.kitchenOrders = JSON.parse(storedSocket).kitchenOrders;
    initialState.waitersOrders = JSON.parse(storedSocket).waitersOrders;
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
        state.isConnecting = false;
    }),
    receiveNewOrder: ((state, action: PayloadAction<Order>) => {
        state.kitchenOrders.push(action.payload);
        }),
    sendOrder: ((_state, _action: PayloadAction<Order>) => {
        return;
        }),
    passOrder: ((_state, _action: PayloadAction<Order>) => {
        return;
        }),
    joinRoom: ((state, _action: PayloadAction<{
        restaurant_id: number,
        restaurant_name: string,
        role: string
        }>) => {
        state.hasJoinedRoom = true;
        return;
        }),
    deleteKitchenOrder: ((state, action: PayloadAction<number>) => {
        console.log('We are deleting the order');
        state.kitchenOrders = state.kitchenOrders.filter((_item, index) => index !== action.payload);
        }),
    passOrdertoWaiter: ((state, action: PayloadAction<Order>) => {
        state.waitersOrders.push(action.payload);
        }),
    deleteWaiterOrder: ((state, action: PayloadAction<number>) => {
        state.waitersOrders = state.waitersOrders.filter((_item, index) => index !== action.payload);
        }),

    

  },
});

export const  socketActions = socketSlice.actions;
export default socketSlice;
