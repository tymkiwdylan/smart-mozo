import React, { useState, useEffect } from "react";
import {
  Grid,
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";

interface PlateFormProps {
  open: boolean;
  cook: Cook | null;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

interface PlateFormData {
  id: number;
  restaurant_id: number;
  name: string;
}

//Component starts here
const EditMenu: React.FC<PlateFormProps> = ({
  open,
  cook,
  onClose,
  onSubmit
}) => {

  const restaurant_id = useAppSelector(state => state.restaurant.restaurant.id);

  const [formData, setFormData] = useState<PlateFormData>({
    id: 0,
    restaurant_id: restaurant_id,
    name: "",
  });

  useEffect(() => {
    if (cook) {
      setFormData({
        id: cook.id,
        restaurant_id: restaurant_id,
        name: cook.name,
      });
    }
  }, [cook]);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
    handleClose();

  };

  const handleClose = () => {
    setFormData({
      id: 0,
      restaurant_id: restaurant_id,
      name: "",
    });
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} style={{
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
       }}>
      <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 4 }}>
        <h2>{cook ? 'Editar Cocinero' : 'Nuevo Cocinero'}</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={8}>
              <TextField
                fullWidth
                label="Nombre del Mozo"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              {cook ? 'Guardar Cambios' : 'Agregar'}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};


export default EditMenu;
