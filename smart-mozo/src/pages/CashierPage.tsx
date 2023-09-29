import React, { useEffect, useState } from 'react';
import { CssBaseline, Container, Grid } from '@mui/material';
import Table from '../components/AdminView/CashierView/Table';
import CustomerList from '../components/AdminView/CashierView/CustomerList';
import CashierView from '../components/AdminView/CashierView/CashierView';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { socketActions } from '../store/socketSlice';


  
  const App: React.FC = () => {

    const socket = useAppSelector((state) => state.socket);
    const restaurant_name = useAppSelector((state) => state.restaurant.restaurant.restaurant_name);
    const restaurant_id = useAppSelector((state) => state.restaurant.restaurant.id);
    const restaurant = useAppSelector((state) => state.restaurant.restaurant);
    const dispatch = useAppDispatch();

    useEffect(() =>{
        dispatch(socketActions.joinRoom({restaurant_id, restaurant_name,
             role: 'cashier'}));

        setTables(restaurant.tables);
    },[]);

    useEffect(() => {
        console.log('Updating cart');
        setCarts(socket.cart);
    }, [socket.cart]);

    useEffect(() => {
        console.log('Updating customers');
        setCustomers(socket.customers);
    }, [socket.customers]);


    const [carts, setCarts] = useState<Cart[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [tables, setTables] = useState<Table[]>([]);

  
    console.log(carts);
  
    const [selectedTable, setSelectedTable] = useState<number | null>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  
    const tableClickHandler = (tableNumber: number) => {
      setSelectedTable(tableNumber);
      setSelectedCustomer(null);
    };
  
    const customerClickHandler = (customerId: string) => {
      setSelectedCustomer(customerId);
    };
  
    const filteredCustomers = customers.filter((customer) => {
        // Include all customers for the selected table
        return customer.table_id === selectedTable;
      });
  
    const selectedCart = carts.find(
      (cart) => cart.customer_id === selectedCustomer && cart.table_id === selectedTable
    );
  
    return (
      <>
        <CssBaseline />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              {tables.map((table) => (
                <Table
                  key={table.id}
                  tableNumber={table.number}
                  onClick={() => tableClickHandler(table.id)}
                />
              ))}
            </Grid>
            <Grid item xs={8}>
              {selectedTable !== null ? (
                <CustomerList
                  customers={filteredCustomers}
                  onCustomerClick={customerClickHandler}
                />
              ) : null}
              <CashierView cart={selectedCart || null} />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  };
  
  export default App;