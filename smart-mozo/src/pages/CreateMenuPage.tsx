import { Box } from "@mui/material";
import MenuManagement from "../components/CreateMenu";
import { useParams } from "react-router-dom";


const CreateMenuPage = () =>{
    const { rest_id } = useParams<{ rest_id: any }>();
    return(
        <Box>
            <MenuManagement restaurant_id={rest_id}/>
        </Box>
    )
}

export default CreateMenuPage;