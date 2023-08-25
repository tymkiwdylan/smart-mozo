import { useEffect, useState } from "react";
import AdminMenu from "../components/AdminMenu/AdminMenu";
import PageContainer from "../components/PageContainer/PageContainer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRestaurantData } from "../store/restaurantActions";
import WaiterList from "../components/WaiterList/WaiterList";
import CookList from "../components/CookList/CookList";
import { Grid } from "@mui/material";
import { sendPostRequest } from "../api/apiUtils";

const AdminPanel = () => {

    const dispatch = useAppDispatch();
    const restaurantData = useAppSelector(state => state.restaurant.restaurant);

    useEffect(() => {
        if (restaurantData.id != 0){
        dispatch(fetchRestaurantData(restaurantData.id));
        }
    }      
    , [dispatch, restaurantData.id]);

    useEffect(() => {
        setMenu(restaurantData.menu);
        setWaiters(restaurantData.waiters);
        setCooks(restaurantData.cooks);
    }, [restaurantData.menu, restaurantData.waiters, restaurantData.cooks]);

    const [menu, setMenu] = useState<MenuItem[]>(restaurantData.menu);
    const [waiters, setWaiters] = useState<Waiter[]>(restaurantData.waiters);
    const [cooks, setCooks] = useState<Cook[]>(restaurantData.cooks);

    const handleDeleteMenu = (menuItem: MenuItem) => {
        //Delete item from backend
        console.log('Deleting item: ', menuItem);
        try {
            sendPostRequest(menuItem, 'delete-menu-item');
            const updatedItems = menu.filter(item => item.id !== menuItem.id);
            setMenu(updatedItems);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDeleteWaiter = (waiter: Waiter) => {
        //Delete item from backend
        console.log('Deleting item: ', waiter);

        try {
            sendPostRequest(waiter, 'delete-waiter');
            const updatedItems = waiters.filter(item => item.id !== waiter.id);
            setWaiters(updatedItems);
        }
        catch (error) {
            console.log(error);
        }

    }

    const handleDeleteCook = (cook: Cook) => {
        //Delete item from backend
        console.log('Deleting item: ', cook);

        try {
            sendPostRequest(cook, 'delete-cook');
            const updatedItems = cooks.filter(item => item.id !== cook.id);
            setCooks(updatedItems);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleEditMenu = (updatedItem: MenuItem) => {
        const updatedItems = menu.map(item =>
            item.id === updatedItem.id ? updatedItem : item
          );
          setMenu(updatedItems);
    }

    const handleEditWaiter = (updatedItem: Waiter) => {
        const updatedItems = waiters.map(item =>
            item.id === updatedItem.id ? updatedItem : item
            );
            setWaiters(updatedItems);
         }
    
    const handleEditCook = (updatedItem: Cook) => {
        const updatedItems = cooks.map(item =>
            item.id === updatedItem.id ? updatedItem : item
            );
            setCooks(updatedItems);
         }

    const handleNewMenuItem = (newItem: MenuItem) => {
        const updatedItems = [...menu, newItem];
        setMenu(updatedItems);
    }

    const handleNewWaiter = (newItem: Waiter) => {
        console.log('Adding new waiter: ', newItem);
        const updatedItems = [...waiters, newItem];
        setWaiters(updatedItems);
    }

    const handleNewCook = (newItem: Cook) => {
        const updatedItems = [...cooks, newItem];
        setCooks(updatedItems);
    }

    return(
        <PageContainer title='Panel Administrativo'>
            <Grid container spacing={12}>
                <Grid item xs={4}>
                    <AdminMenu items={menu} onEditItem={handleEditMenu} onDeleteItem={handleDeleteMenu} onAddItem={handleNewMenuItem}/>
                </Grid>
                <Grid item xs={4}>
                    <WaiterList items={waiters} onEditItem={handleEditWaiter} onDeleteItem={handleDeleteWaiter} onAddItem={handleNewWaiter}/>
                </Grid>
                <Grid item xs={4}>
                    <CookList items={cooks} onEditItem={handleEditCook} onDeleteItem={handleDeleteCook} onAddItem={handleNewCook}/>
                </Grid>
            </Grid>
        </PageContainer>

    );
}

export default AdminPanel;