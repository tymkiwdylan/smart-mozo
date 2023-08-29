import React, { useEffect, useState } from 'react';
import { Typography, AppBar, BottomNavigation, Container, CssBaseline, Toolbar, Button, Box, Grid, IconButton } from '@mui/material';
import UserMenu from '../components/UserView/Menu/Menu';
import RestaurantTwoToneIcon from '@mui/icons-material/RestaurantTwoTone';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import './styles.css'
import { useParams } from 'react-router-dom';
import InputModal from '../components/UserView/Input/InputModal';
import OrderMenu from '../components/UserView/OrderMenu/OrderMenu';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setOrderName } from '../store/nameSlice';
import io from 'socket.io-client';
import OrderConfirm from '../components/UserView/OrderConfirm/OrderConfirm';
import { socketActions } from '../store/socketSlice';

const HomePage: React.FC = () => {

    const { restaurant_id } = useParams<{ restaurant_id: string}>();
    const { table_id } = useParams<{ table_id: string}>();
    const socket = useAppSelector((state) => state.socket);

    const orderName = useAppSelector((state) => state.orderName.name);
    const dispatch = useAppDispatch();

    const [items, setItems] = useState<MenuItem[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [orderList, setOrderList] = useState<MenuItem[]>([]); // This is the list of items that the user has added to the order
    const [name, setName] = useState(orderName); // This is the name of the order
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For controlling the dropdown menu
    const [notes, setNotes] = useState(''); // This is the notes that the user has added to the order
    const [openConfirm, setOpenConfirm] = useState(false); // For controlling the confirm order modal

    console.log(name);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/user/get-rest/${restaurant_id}`)
        .then((response) => response.json())
        .then((data) => setItems(data['data'].menu));

        if (name.length === 0) {
            setOpenModal(true);
        }

    }, [restaurant_id, table_id]);

    const handleAddClick = (menuItem: MenuItem) => {
        setOrderList((prevOrderList) => [...prevOrderList, menuItem]);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = (index: number) => {
        setOrderList((prevOrderList) => {
            const newList = [...prevOrderList];
            newList.splice(index, 1);
            return newList;
        });
    };

    const handleConfirmClose = () => {
        setOpenConfirm(false);
    };

    const handleConfirm = () => {
        // Send the order to the backend
        dispatch(socketActions.sendOrder({restaurant_id: parseFloat(restaurant_id as string),
                                          table_id: parseFloat(table_id as string),
                                          items: orderList,
                                          notes: notes,
                                          name: name,
                                          status: 'pending',
                                          id: socket.orders.length}));
        
        // Reset the order list
        setOrderList([]);
        setOpenConfirm(false);
    }

    return (
        <div>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <Grid container alignItems="flex-end" justifyContent="space-between">
                        <IconButton color="secondary" onClick={handleMenuClick}>
                            <RestaurantTwoToneIcon/>
                        </IconButton>
                        <Typography variant="h6" style={{ textAlign: 'center' }}>My Restaurant</Typography>
                        <IconButton color="secondary"> <ReceiptOutlinedIcon/> </IconButton>
                    </Grid>
                </Toolbar>
            </AppBar>

            <OrderMenu anchorEl={anchorEl} orderList={orderList} handleMenuClose={handleMenuClose} handleDelete={handleDelete} />
            <OrderConfirm open={openConfirm} items={orderList} onDeleteItem={handleDelete} onSubmit={handleConfirm} setNote={setNotes} onClose={handleConfirmClose} />

            <Container style={{ height: '100vh', overflowY: 'scroll' }}>
                <Box style={{ marginTop: '4rem', marginBottom: '4rem' }}>
                    <UserMenu items={items} onAdd={handleAddClick} /> {/* Render your Menu component here */}
                </Box>
            </Container>

            <BottomNavigation value='Confirmar Pedido' className='navBar'>
                <Button variant="outlined" fullWidth color="secondary" className='button' onClick={() => 
                    orderList.length === 0 ? alert('No hay items en el pedido') : setOpenConfirm(true)
                    } > Confirmar Pedido </Button>
            </BottomNavigation>
            <InputModal open={openModal} onAccept={(name) => {
                dispatch(setOrderName(name));
                setName(name); // Set the name of the order
                setOpenModal(false);
            }} />
        </div>
    );
};

export default HomePage;
