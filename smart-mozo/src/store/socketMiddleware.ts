// socketThunks.ts
import { Middleware } from 'redux';
import { Socket, io } from 'socket.io-client';
import { socketActions } from './socketSlice';


const socketMiddleware: Middleware = store => {

  let socket: Socket;

  return next => action => {

    const isConnectionEstablished = socket && store.getState().socket.isConnected;

    if(socketActions.startConnecting.match(action)) {
      socket = io('http://127.0.0.1:5000/');
      socket.on('connect', () => {
        store.dispatch(socketActions.connectionEstablished());
    });

    // socket.on('send-all-orders', (data: any) => {
    //     store.dispatch(socketActions.receiveAllOrders(data));
    // });

    socket.on('order', (data: any) => {
        console.log('We are updating the order');
        store.dispatch(socketActions.receiveNewOrder(data));
    });

    socket.on('prepared-order', (data: any) => {
        console.log('We are sending the order to the waiter');
        store.dispatch(socketActions.passOrdertoWaiter(data));
        // store.dispatch(socketActions.deleteKitchenOrder(0)); //This is wrong but let's see
    });

    }

    if(socketActions.joinRoom.match(action) && isConnectionEstablished) {
      socket.emit('join', action.payload);
    }

    if (socketActions.sendOrder.match(action) && isConnectionEstablished) {
      socket.emit('order', action.payload);
    }

    if (socketActions.passOrder.match(action) && isConnectionEstablished) {
      socket.emit('prepared-order', action.payload);
    }

    
    // if (socketActions.preparedOrder.match(action) && isConnectionEstablished) {
    //   socket.emit('prepared-order', action.payload.order);
    // }
    
    next(action);
  };
};



export  {socketMiddleware};
