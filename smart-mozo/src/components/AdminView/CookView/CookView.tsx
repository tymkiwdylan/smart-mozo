import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Box, Grid } from '@mui/material';
import OrderCard from '../WaiterView/OrderCard';
import { socketActions } from '../../../store/socketSlice';
// import { useDrop, DropTargetMonitor } from 'react-dnd';


const OrderView: React.FC = () => {

    const socket = useAppSelector((state) => state.socket);
    const dispatch = useAppDispatch();
    
    const restaurant_id = useAppSelector((state) => state.restaurant.restaurant.id);
    const restaurant_name = useAppSelector((state) => state.restaurant.restaurant.restaurant_name);

    useEffect(() => {
        dispatch(socketActions.joinRoom({restaurant_id, restaurant_name, role: 'cook'}));
    }, []);

    useEffect(() => {
        setOrders(socket.kitchenOrders);
    }, [socket.kitchenOrders]);
    
    const handleOrderCompleted = (index: number, order: Order) => {
        dispatch(socketActions.passOrder(order));
        dispatch(socketActions.deleteKitchenOrder(index));
    }

    const [orders, setOrders] = useState<Order[]>([]);

  return (
    <Box
    sx={{
      height: '100vh',
      overflowY: 'scroll',
      alignItems: 'center', // Vertically center-align the cards
      justifyContent: 'center', // Horizontally center-align the cards
      bgcolor: 'black',
      
    }}
  >
    <Grid container spacing={0} style={{marginTop: '10px'}}>
      {orders.map((order, index) => (
        <Grid item xs={12} sm={6} md={6} lg={3} key={index} style={{marginBottom: '10px'}}>
        <OrderCard order={order} onOrderCompleted={() => handleOrderCompleted(index, order)} />
        </Grid>
      ))}
    </Grid>
  </Box>
  );
}

export default OrderView;