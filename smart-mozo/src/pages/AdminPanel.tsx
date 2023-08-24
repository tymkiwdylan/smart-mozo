import { useEffect } from "react";
import AdminMenu from "../components/AdminMenu/AdminMenu";
import PageContainer from "../components/PageContainer/PageContainer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRestaurantData } from "../store/restaurantActions";

const AdminPanel = () =>{

    const dispatch = useAppDispatch();
    const restaurantData = useAppSelector(state => state.restaurant.restaurant);

    useEffect(() => {
        if (restaurantData.id != 0){
        dispatch(fetchRestaurantData(restaurantData.id));
        }
    }      
    , []);

    const items = restaurantData.menu;

    const handleDeleteItem = (menuItem: MenuItem) => {
        //Delete item from backend
        console.log('Deleting item: ', menuItem);
    }

    console.log(restaurantData);

    return(
        <PageContainer title='Home'>
            <AdminMenu items={items} onDeleteItem={handleDeleteItem} />
        </PageContainer>

    );
}

export default AdminPanel;