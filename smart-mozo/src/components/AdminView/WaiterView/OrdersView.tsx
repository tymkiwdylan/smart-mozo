import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Box, Grid } from '@mui/material';
import OrderCard from './OrderCard';
import { socketActions } from '../../../store/socketSlice';
import { socketMiddleware } from '../../../store/socketMiddleware';




const OrderView: React.FC = () => {

    const socket = useAppSelector((state) => state.socket);
    const dispatch = useAppDispatch();
    
    const restaurant_id = useAppSelector((state) => state.restaurant.restaurant.id);
    const restaurant_name = useAppSelector((state) => state.restaurant.restaurant.restaurant_name);

    useEffect(() => {
        console.log('OrderView mounted');
        dispatch(socketActions.joinRoom({restaurant_id, restaurant_name}));
    }, []);

    useEffect(() => {
        console.log('Orders updated');
        setOrders(socket.orders);
    }, [socket.orders]);
    
    const handleOrderCompleted = (order: Order) => {
        console.log(order);


    }

    const [orders, setOrders] = useState<Order[]>(socket.orders);

    console.log(orders);

  return (
    <Box 
        sx={{height: '100vh',
            overflowY: 'scroll',}}
    >
        {orders.map((order, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
                <OrderCard order={order} onOrderCompleted={handleOrderCompleted} />
            </Grid>
        ))}
    </Box>
  );
}

export default OrderView;