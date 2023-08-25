import { useEffect, useState } from "react";
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

    const [items, setItems] = useState<MenuItem[]>(restaurantData.menu);

    const handleDeleteItem = (menuItem: MenuItem) => {
        //Delete item from backend
        console.log('Deleting item: ', menuItem);
    }

    const handleEditItem = (updatedItem: MenuItem) => {
        const updatedItems = items.map(item =>
            item.id === updatedItem.id ? updatedItem : item
          );
          setItems(updatedItems);
    }

    console.log(restaurantData);

    return(
        <PageContainer title='Panel Administrativo'>
            <AdminMenu items={items} onDeleteItem={handleDeleteItem} onEditItem={handleEditItem} />
        </PageContainer>

    );
}

export default AdminPanel;