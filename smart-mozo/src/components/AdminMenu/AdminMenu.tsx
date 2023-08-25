import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Card, CardContent, CardMedia, Box, Button } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import EditMenu from '../EditMenu/EditMenu';
import { sendPostRequest } from '../../api/apiUtils';


interface Props {
  items: MenuItem[];
  onDeleteItem: (item: MenuItem) => void;
  onEditItem: (item: MenuItem) => void;
}

const ItemList: React.FC<Props> = ({ items, onDeleteItem, onEditItem }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleEditItem = (item: MenuItem) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  const handleSubmit = async (formData: any) => {
    //Send formData to backend
    const data = new FormData();
    data.append('file', formData.image);
    data.append('plate', formData.plateName);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('restaurant_id', formData.restaurant_id);
    data.append('id', formData.id);
    try {
      const response = await sendPostRequest(data, 'edit-menu-item');
      console.log(response);
      onEditItem(response.data);
    }
    catch (error) {
      console.log(error);
    }

  };

  return (
    <Box>
        <Button
        color='secondary'
        variant="outlined"
        startIcon={<Add />}
        onClick={() => {
          setSelectedItem(null); // Reset selectedItem when adding a new item
          setOpenModal(true);
        }}
        style={{ marginBottom: '10px' }}
      >
        Nuevo Plato
      </Button>
      <List>
        {items.map(item => (
          <Card key={item.id} style={{ marginBottom: '10px', borderRadius: '8px' }}>
            <ListItem>
              <CardMedia
                component="img"
                alt={item.plate}
                style={{ maxWidth: '200px', maxHeight: '100px', objectFit: 'cover' }}
                image={item.img}
              />
              <CardContent>
                <ListItemText
                  primary={item.plate}
                  secondary={`Price: $${item.price.toFixed(2)}`}
                />
                <ListItemText primary={item.description} />
              </CardContent>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditItem(item)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteItem(item)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Card>
        ))}
      </List>
        {selectedItem && (
          <EditMenu open={openModal} onClose={handleCloseModal} onSubmit={handleSubmit} plate={selectedItem} />
        )}
    </Box>
  );
};

export default ItemList;
