import { CssBaseline, ThemeProvider} from "@mui/material";
import {makeStyles} from '@mui/styles';
import theme from "./assets/css/theme"
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CreateRestaurantPage from "./pages/CreateRestaurantPage";
import CreateAdminPage from "./pages/CreateAdminPage";
import CreateMenuPage from "./pages/CreateMenuPage";
import AdminPanel from "./pages/AdminPanel";
import Home from './pages/UserHome';
import OrderView from "./components/AdminView/WaiterView/OrdersView";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { socketActions } from "./store/socketSlice";
import CookView from "./components/AdminView/CookView/CookView";
const useStyles = makeStyles({
  app: {
    width: '100vw',
    backgroundColor: '#f2f4f7',
    height: '100vh',
    overflow: 'hidden',
  },
});

function App() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('App mounted');
    dispatch(socketActions.startConnecting());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className={classes.app}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/crear-restaurant" element={<CreateRestaurantPage/>}/>
              <Route path='/crear-admin/' element={<CreateAdminPage/>}/>
              <Route path="/crear-menu/" element={<CreateMenuPage/>}/>
              <Route path="/admin/" element={<AdminPanel/>}/>
              <Route path='/home/:restaurant_id/:table_id' element={<Home/>}/>
              <Route path='/waiter/' element={<OrderView/>}/>
              <Route path='/cook/' element={<CookView/>}/>
            </Routes>
          </Router>
        </div>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App;
