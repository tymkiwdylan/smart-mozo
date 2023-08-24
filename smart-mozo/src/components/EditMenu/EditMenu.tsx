import React, { useState, useEffect } from "react";
import {
  Grid,
  Modal,
  Box,
  TextField,
  TextareaAutosize,
  Button,
  IconButton,
  InputLabel,
  Input
} from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";

interface PlateFormProps {
  open: boolean;
  plate: MenuItem | null;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

interface PlateFormData {
  plateName: string;
  description: string;
  price: number;
  image: File | string | null;
}

//Component starts here
const EditMenu: React.FC<PlateFormProps> = ({
  open,
  plate = null,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<PlateFormData>({
    plateName: "",
    description: "",
    price: 0,
    image: null
  });

  useEffect(() => {
    if (plate) {
      setFormData({
        plateName: plate.plateName,
        description: plate.description,
        price: plate.price,
        image: typeof plate.image === "string" ? plate.image : null
      });
    }
  }, [plate]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0] || null;

    setFormData((prevData) => ({
      ...prevData,
      image: selectedImage
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        <h2>{plate ? 'Editar Plato' : 'Nuevo Plato'}</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={8}>
              <TextField
                fullWidth
                label="Nombre del Plato"
                name="plateName"
                value={formData.plateName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item container xs={12} sm={4} md={4} direction="column">
              <InputLabel htmlFor="image-upload">
                <Box>
                  {formData.image ? (
                    <img
                      src={
                        typeof formData.image === "string"
                          ? formData.image
                          : URL.createObjectURL(formData.image)
                      }
                      alt="Uploaded"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  ) : (
                    <IconButton component="span">
                      <AddPhotoAlternate />
                    </IconButton>
                  )}
                </Box>
              </InputLabel>
              <Input
                id="image-upload"
                type="file"
                inputProps={{ accept: "image/*" }}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextareaAutosize
                style={{ width: "100%", marginTop: 2 }}
                minRows={6}
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                fullWidth
                type="number"
                label="Precio"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              {plate ? 'Guardar Cambios' : 'Agregar'}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};


export default EditMenu;
