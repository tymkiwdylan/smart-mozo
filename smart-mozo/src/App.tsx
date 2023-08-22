import { CssBaseline, ThemeProvider} from "@mui/material";
import {makeStyles} from '@mui/styles';
import theme from "./assets/css/theme"
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CreateRestaurantPage from "./pages/CreateRestaurantPage";
import CreateAdminPage from "./pages/CreateAdminPage";

const useStyles = makeStyles({
  app: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden', // Prevent scrollbars
    backgroundColor: '##f2f4f7',
  },
});

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className={classes.app}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/crear-restaurant" element={<CreateRestaurantPage/>}/>
              <Route path='/crear-admin/:rest_id' element={<CreateAdminPage/>}/>
            </Routes>
          </Router>
        </div>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App;
