// src/components/LoginPage.tsx

import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { fetchRestaurantData } from '../../../store/restaurantActions';
import { setToken } from '../../../store/restaurantSlice';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin =  () => {
    // You can implement your login logic here
    axios.post('http://127.0.0.1:5000/api/auth/login', {
        username,
        password,
      })
      .then((response) => {
        console.log(response);
        
          dispatch(setToken(response.data.access_token));
          dispatch(fetchRestaurantData(response.data.data.restaurant_id));
        // } else {
        //   alert('Invalid username or password');
        // }
      }).then(() => {
        navigate('/admin');
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          onClick={handleLogin}
        >
          Login
        </Button>
    </Container>
  );
};

export default Login;