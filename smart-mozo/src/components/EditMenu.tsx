import React, { useState } from 'react';
import { Modal, Box, TextField, TextareaAutosize, Button } from '@mui/material';

interface PlateFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: PlateFormData) => void;
}

interface PlateFormData {
  plateName: string;
  description: string;
  price: number;
  image: File | null;
}

const PlateForm: React.FC<PlateFormProps> = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<PlateFormData>({
    plateName: '',
    description: '',
    price: 0,
    image: null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      image: selectedImage,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 'none',
        }}
      >
        <h2>Add a New Plate</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Plate Name"
            name="plateName"
            value={formData.plateName}
            onChange={handleInputChange}
            required
          />
          <TextareaAutosize
            style={{ width: '100%', marginTop: 2 }}
            minRows={3}
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            type="number"
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: '1rem' }}
          />
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default PlateForm;
