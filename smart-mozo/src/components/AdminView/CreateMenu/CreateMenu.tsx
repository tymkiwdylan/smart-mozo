import React, { useState } from 'react';
import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { sendPostRequest } from '../../../api/apiUtils';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'row'
  },
  paper: {
    padding: 24,
    maxWidth: 600,
    width: '100%',
    borderRadius: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  fileContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const CreateMenu: React.FC<{ restaurant_id: number|undefined }> = ({ restaurant_id }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRedirect = () => {
    navigate('#'); //Should redirect to the edit menu page
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (file && restaurant_id) { //TODO: Handle error if restaurant_id is undefined
      // Create a FormData object
      const formData = new FormData();
  
      // Append the file to the FormData object
      formData.append('file', file);
  
      // Append other form data properties as needed
      formData.append('restaurant_id', restaurant_id.toString());
  
      try {
        const response: Response = await sendPostRequest(formData, 'menu/create-menu');
        if (response.ok) {
          navigate('#');
        }
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  };

  return (
    <Grid container className={classes.root} spacing={16}>
      <Grid item xs={5} alignContent='center'>
        <Paper className={classes.paper} sx={{ background: '#F0F0F0' }}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  Crear Menu
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography> Subir archivo excel o .csv </Typography>
              </Grid>
              <Grid item xs={4}>
                <a href= {`http://127.0.0.1:5000/api/menu/get-menu-template/${restaurant_id}`}>
                  Ejemplo.xslx
                </a>
              </Grid>
              <Grid item xs={12} className={classes.fileContainer}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="menu"></InputLabel>
                  <Input
                    type="file"
                    inputProps={{ accept: '.xlsx, .csv' }}
                    id="menu-file"
                    onChange={handleFileUpload}
                  />
                  <FormHelperText>Subir Archivo Excel</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            {/* Rest of your form fields */}
            <Button type="submit" variant="contained" color="primary">
              Siguiente
            </Button>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper className={classes.paper} sx={{ background: '#F0F0F0' }} >
          <Grid container spacing={28}>
            <Grid item xs={12} alignItems='center'>
              <Typography variant='h4' align='center'>
                O Diseñalo Manualmente
              </Typography>
            </Grid>
            <Grid item xs={12} alignItems='center'>
              <Button type='button' variant='contained' color='primary' fullWidth onClick={handleRedirect}>
                Aquí
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateMenu;
