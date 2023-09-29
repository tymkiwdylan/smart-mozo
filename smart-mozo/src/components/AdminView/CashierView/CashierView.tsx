import React from 'react';
import { Paper, Typography, Box } from '@mui/material';


interface CashierViewProps {
  cart: Cart | null;
}

const CashierView: React.FC<CashierViewProps> = ({ cart }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
      {cart ? (
        <>
          <Typography variant="h5" gutterBottom>
            Table {cart.table_id}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Customer ID: {cart.customer_id}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Cart Items:
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            {cart.items.map((item, index) => (
              <Box key={index} sx={{ border: '1px solid #ccc', padding: 1, marginBottom: 1 }}>
                {item.plate} - ${item.price}
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <Typography variant="subtitle1">Select a customer to view their cart</Typography>
      )}
    </Paper>
  );
};

export default CashierView;
