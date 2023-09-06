import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Menu, MenuItem, ButtonBase, Icon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Option  from './Option';
import './PageContainer.css';
import { useAppDispatch } from '../../store/hooks';
import { setRestaurant, setToken } from '../../store/restaurantSlice';
import { useNavigate } from 'react-router-dom';

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  // Set the static image you want to use for the button

  const dropdownOptions = [<Option text='staff' path='/admin/staff/'/>];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    };

  const handleLogout = () => {
    const emptyRestaurant = {
      id: 0,
      name: '',
      restaurant_name: '',
      address: '',
      menu: [],
      waiters: [],
      cooks: [],
      tables: [],
    };
    navigate('/admin/login');
    dispatch(setToken(''));
    dispatch(setRestaurant(emptyRestaurant));
  };


  return (
    <div className="page-container">
      <AppBar position="fixed">
        <Toolbar className='top-bar'>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <ButtonBase onClick={handleOpenMenu}>
            <Icon> <SettingsIcon/> </Icon>
          </ButtonBase>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            sx={{ marginTop: '1rem'}}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {dropdownOptions.map((option, index) => (
              <MenuItem
                key={index}
              >
                {option}
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingTop: '2rem', paddingBottom: '2rem', background: '#f2f4f7', width: '100vw'}}>
        {children}
      </Container>
    </div>
  );
};

export default PageContainer;
