import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface CustomerListProps {
  customers: Customer[];
  onCustomerClick: (customerId: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onCustomerClick }) => {
  return (
    <List>
      {customers.map((customer, index) => (
        <ListItem
          key={index}
          onClick={() => onCustomerClick(customer.id)}
        >
          <ListItemText primary={`Customer ID: ${customer.id}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default CustomerList;
