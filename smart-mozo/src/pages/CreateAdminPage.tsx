import { Box } from "@mui/material"
import CreateAdmin from "../components/CreateAdmin"
import { useParams } from "react-router-dom";


const CreateAdminPage = () =>{
    const { rest_id } = useParams<{ rest_id: any }>();
    //Change this for redux store
    return(
        <Box>
            <CreateAdmin restaurant_id={rest_id}/>
        </Box>
    )
}

export default CreateAdminPage;