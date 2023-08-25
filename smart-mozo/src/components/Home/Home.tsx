import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Home = () =>{
    const theme = useTheme();

    console.log(theme.palette.secondary);

    return(
    <Box sx={{height: '100vh'}}>
        <h1 style={{color: theme.palette.secondary.main }}>Hello World</h1>
    </Box>
    );
}

export default Home;