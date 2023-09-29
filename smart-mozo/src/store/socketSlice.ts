// socketSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketState {
  kitchenOrders: Order[];
  waitersOrders: Order[];
  cart: Cart[];
  customers: Customer[];
  isConnecting: boolean;
  isConnected: boolean;
  hasJoinedRoom: boolean;
}

const initialState: SocketState = {
    kitchenOrders: [],
    waitersOrders: [],
    cart: [],
    customers: [],
    isConnected: false,
    isConnecting: false,
    hasJoinedRoom: false,
};

const storedSocket = localStorage.getItem('socket');
if (storedSocket){
    initialState.kitchenOrders = JSON.parse(storedSocket).kitchenOrders;
    initialState.waitersOrders = JSON.parse(storedSocket).waitersOrders;
    initialState.customers = JSON.parse(storedSocket).customers;
    initialState.cart = JSON.parse(storedSocket).cart;
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
    recieveCartItem: ((state, action: PayloadAction<Cart>) => {
        const newCart: Cart = action.payload;
        const customer_id = newCart.customer_id;
        // Find the index of the cart item to update
        const cartIndexToUpdate = state.cart.findIndex((cart: Cart) => cart.customer_id === customer_id);

        if (cartIndexToUpdate === -1) {
        // Cart item doesn't exist, so add it to the array
            state.cart.push(action.payload);
            } 
        else {
        // Cart item exists, update its items list by adding the new items
            state.cart[cartIndexToUpdate].items = [
          ...state.cart[cartIndexToUpdate].items,
          ...newCart.items,
            ];
            }
        }),
    sendOrder: ((_state, _action: PayloadAction<Order>) => {
        return;
        }),
    passOrder: ((_state, _action: PayloadAction<Order>) => {
        return;
        }),
    newCustomer: ((_state, _action: PayloadAction<Customer>) => {
        return;
        }),
    addToCart : ((_state, _action: PayloadAction<Cart>) => {
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
    addCustomer: ((state, action: PayloadAction<Customer>) =>{
        state.customers.push(action.payload);
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
