import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { sendPostRequest } from '../../api/apiUtils';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { fetchRestaurantData } from '../../store/restaurantActions';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  paper: {
    padding: 24, // Equivalent to theme.spacing(3)
    maxWidth: 400,
    width: '100%',
    borderRadius: 8, // Equivalent to theme.spacing(1)
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16, // Equivalent to theme.spacing(2)
  },
}));

const CreateRestaurant: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [restaurantName, setRestaurantName] = useState('');
  const [appID, setAppID] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      restaurant_name: restaurantName,
      account_id: appID,
    };

    try {
        const response: any = await sendPostRequest(formData, 'create-restaurant');     
        const restaurant_id = response['data']['id'];

        await dispatch(fetchRestaurantData(restaurant_id));
        navigate(`/crear-admin`);
      
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <Grid container className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography variant="h5" gutterBottom>
            Crear Restaurante
          </Typography>
          <TextField
            label="Nombre del Restaurante"
            fullWidth
            variant="outlined"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
          <TextField
            label="MercadoPago App ID"
            fullWidth
            variant="outlined"
            value={appID}
            onChange={(e) => setAppID(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Siguiente
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default CreateRestaurant;

