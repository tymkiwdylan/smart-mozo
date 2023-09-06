import { useEffect, useState } from "react";
import AdminMenu from "../components/AdminView/AdminMenu/AdminMenu";
import PageContainer from "../components/PageContainer/PageContainer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRestaurantData, setMenuItems} from "../store/restaurantActions";
import { Grid } from "@mui/material";
import { sendPostRequest } from "../api/apiUtils";
import WaiterGrid from "../components/AdminView/TableAssignment/WaiterGrid";
import TableGrid from "../components/AdminView/Tables/Tables";

const AdminPanel = () => {

    const dispatch = useAppDispatch();
    const restaurantData = useAppSelector(state => state.restaurant.restaurant);

    useEffect(() => {
        if (restaurantData){
        dispatch(fetchRestaurantData(restaurantData.id));
        }
    }, [dispatch]);

    useEffect(() => {
        setMenu(restaurantData.menu);
        setWaiters(restaurantData.waiters);
        setTables(restaurantData.tables);
    }, [restaurantData]);

    const [menu, setMenu] = useState<MenuItem[]>(restaurantData.menu);
    const [waiters, setWaiters] = useState<Waiter[]>(restaurantData.waiters);
    const [tables, setTables] = useState<Table[]>(restaurantData.tables);

    const handleDeleteMenu = (menuItem: MenuItem) => {
        //Delete item from backend
        console.log('Deleting item: ', menuItem);
        try {
            sendPostRequest(menuItem, 'menu/delete-menu-item');
            const updatedItems = menu.filter(item => item.id !== menuItem.id);
            setMenu(updatedItems);
            dispatch(setMenuItems(updatedItems));
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
          dispatch(setMenuItems(updatedItems));
    }

    const handleNewMenuItem = (newItem: MenuItem) => {
        const updatedItems = [...menu, newItem];
        setMenu(updatedItems);
        dispatch(setMenuItems(updatedItems));
    }


    return(
        <PageContainer title='Panel Administrativo'>
            <Grid container spacing={12} sx={{marginLeft: '-10rem'}}>
                <Grid item xs={4}>
                    <WaiterGrid waiters={waiters}/>
                </Grid>
                <Grid item xs={4}>
                    <AdminMenu items={menu} onEditItem={handleEditMenu} onDeleteItem={handleDeleteMenu} onAddItem={handleNewMenuItem}/>
                </Grid>
                <Grid item xs={4}>
                    <TableGrid tables={tables}/>
                </Grid>
            </Grid>
        </PageContainer>

    );
}

export default AdminPanel;