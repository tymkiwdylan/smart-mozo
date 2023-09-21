import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { sendPostRequest } from '../../../api/apiUtils';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  paper: {
    padding: 24,
    maxWidth: 400,
    width: '100%',
    borderRadius: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
}));



const CreateAdmin: React.FC<{ restaurant_id: number|undefined }> = ({ restaurant_id }) => {
  const navigate = useNavigate();
  const classes = useStyles(); 
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      restaurant_id: restaurant_id,
      email: email,
      username: username,
      password: password,
      permission: 0, //this will actually depend on an external factor. To change later
    };

    try {
      await sendPostRequest(formData, 'auth/create-admin');
      navigate(`/crear-menu`);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <Grid container className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography variant="h5" gutterBottom>
            Crear Administrador
          </Typography>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Usuario"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Contraseña"
            fullWidth
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirmar Contraseña"
            fullWidth
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default CreateAdmin;
