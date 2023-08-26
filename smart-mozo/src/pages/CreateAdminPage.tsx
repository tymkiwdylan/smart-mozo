import { Box } from "@mui/material"
import CreateAdmin from "../components/CreateAdmin/CreateAdmin"
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";


const CreateAdminPage = () =>{
    const navigate = useNavigate();
    const restaurant = useAppSelector((state: RootState) => state.restaurant.restaurant);
    if (!restaurant){
        navigate('#'); //Should navigate to Login Page
    }
    //Change this for redux store
    return(
        <Box>
            <CreateAdmin restaurant_id={restaurant?.id}/>
        </Box>
    )
}

export default CreateAdminPage;