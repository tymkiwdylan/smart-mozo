import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer/PageContainer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRestaurantData, setCooks, setWaiters } from "../store/restaurantActions";
import WaiterList from "../components/AdminView/WaiterList/WaiterList";
import CookList from '../components/AdminView/CookList/CookList';
import { Grid } from "@mui/material";
import { sendPostRequest } from "../api/apiUtils";

const AdminPanel = () => {

    const dispatch = useAppDispatch();
    const restaurantData = useAppSelector(state => state.restaurant.restaurant);

    useEffect(() => {
        if (restaurantData.id == 0) return;
        dispatch(fetchRestaurantData(restaurantData.id));
        setWaiter(restaurantData.waiters);
        setCook(restaurantData.cooks);
    }, [dispatch, restaurantData.id]);

    const [waiters, setWaiter] = useState<Waiter[]>([]);
    const [cooks, setCook] = useState<Cook[]>([]);


    const handleDeleteWaiter = (waiter: Waiter) => {
        //Delete item from backend
        console.log('Deleting item: ', waiter);

        try {
            sendPostRequest(waiter, 'waiter/delete-waiter');
            const updatedItems = waiters.filter(item => item.id !== waiter.id);
            setWaiter(updatedItems);
            dispatch(setWaiters(updatedItems));
        }
        catch (error) {
            console.log(error);
        }

    }

    const handleDeleteCook = (cook: Cook) => {
        //Delete item from backend
        console.log('Deleting item: ', cook);

        try {
            sendPostRequest(cook, 'cook/delete-cook');
            const updatedItems = cooks.filter(item => item.id !== cook.id);
            setCook(updatedItems);
            dispatch(setCooks(updatedItems));
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleEditWaiter = (updatedItem: Waiter) => {
        const updatedItems = waiters.map(item =>
            item.id === updatedItem.id ? updatedItem : item
            );
            setWaiter(updatedItems);
            dispatch(setWaiters(updatedItems));
         }
    
    const handleEditCook = (updatedItem: Cook) => {
        const updatedItems = cooks.map(item =>
            item.id === updatedItem.id ? updatedItem : item
            );
            setCook(updatedItems);
            dispatch(setCooks(updatedItems));
         }


    const handleNewWaiter = (newItem: Waiter) => {
        console.log('Adding new waiter: ', newItem);
        const updatedItems = [...waiters, newItem];
        setWaiter(updatedItems);
        dispatch(setWaiters(updatedItems));
    }

    const handleNewCook = (newItem: Cook) => {
        const updatedItems = [...cooks, newItem];
        setCook(updatedItems);
        dispatch(setCooks(updatedItems));
    }

    return(
        <PageContainer title='Staff'>
            <Grid container spacing={12}>
                <Grid item xs={6}>
                    <WaiterList items={waiters} onEditItem={handleEditWaiter} onDeleteItem={handleDeleteWaiter} onAddItem={handleNewWaiter}/>
                </Grid>
                <Grid item xs={6}>
                    <CookList items={cooks} onEditItem={handleEditCook} onDeleteItem={handleDeleteCook} onAddItem={handleNewCook}/>
                </Grid>
            </Grid>
        </PageContainer>

    );
}

export default AdminPanel;