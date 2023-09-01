// src/components/LoginPage.tsx

import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { fetchRestaurantData } from '../../../store/restaurantActions';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    // You can implement your login logic here
    axios.post('http://127.0.0.1:5000/api/auth/login', {
        username,
        password,
      })
      .then((response) => {
        console.log(response);
        
          localStorage.setItem('token', response.data.access_token);
          console.log(response.data.access_token);
          dispatch(fetchRestaurantData(response.data.data.restaurant_id))
          navigate('/admin');
        // } else {
        //   alert('Invalid username or password');
        // }
      })
      .catch((error) => {
        console.log(error);
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