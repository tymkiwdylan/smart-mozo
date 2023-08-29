import React from 'react';
import { Card, CardContent, Typography, IconButton, CardActions } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';


interface Props {
  order: Order;
  onOrderCompleted: (order: Order) => void;
}

const OrderCard: React.FC<Props> = ({ order, onOrderCompleted }) => {
  return (
    <Card style={{ marginBottom: '10px', borderRadius: '8px' }}>
      <CardContent>
        <Typography variant="h6">{order.name}</Typography>
        <Typography color="textSecondary">Table: {order.table_id}</Typography>
        <Typography variant="body1">Items:</Typography>
        <ul>
          {order.items.map((item) => (
            <li key={item.id}>{item.plate}</li>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <IconButton edge="end" aria-label="complete" onClick={() => onOrderCompleted(order)}>
          <CheckCircle />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default OrderCard;
