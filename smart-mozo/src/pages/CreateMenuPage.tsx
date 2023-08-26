import { Box } from "@mui/material";
import CreateMenu from "../components/CreateMenu/CreateMenu";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useAppSelector } from "../store/hooks";


const CreateMenuPage = () =>{
    const navigate = useNavigate();
    const restaurant = useAppSelector((state: RootState) => state.restaurant.restaurant);
    console.log(restaurant?.id);
    if (!restaurant){
        navigate('#'); //Should navigate to Login Page
    }
    return(
        <Box>
            <CreateMenu restaurant_id={restaurant?.id}/>
        </Box>
    )
}

export default CreateMenuPage;