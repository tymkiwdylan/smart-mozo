// socketThunks.ts
import { Middleware } from 'redux';
import { Socket, io } from 'socket.io-client';
import { socketActions } from './socketSlice';
import { RootState } from './store';
import { createAsyncThunk } from '@reduxjs/toolkit';

const sendSocketMessage = (message: string) => ({
  type: 'socket/SEND_MESSAGE',
  payload: message,
});


const socketMiddleware: Middleware = store => {

  let socket: Socket;

  return next => action => {

    const isConnectionEstablished = socket && store.getState().socket.isConnected;

    if(socketActions.startConnecting.match(action)) {
      socket = io('http://127.0.0.1:5000/');
      socket.on('connect', () => {
        store.dispatch(socketActions.connectionEstablished());
    });

    socket.on('send-all-orders', (data: any) => {
        store.dispatch(socketActions.receiveAllOrders(data));
    });

    socket.on('order', (data: any) => {
        store.dispatch(socketActions.receiveNewOrder(data));
    });
    }

    if(socketActions.joinRoom.match(action) && isConnectionEstablished) {
      socket.emit('join', action.payload);
    }

    if (socketActions.sendOrder.match(action) && isConnectionEstablished) {
      console.log(action.payload);
      socket.emit('order', action.payload);
    }
    next(action);
  };
};



export  {socketMiddleware};
