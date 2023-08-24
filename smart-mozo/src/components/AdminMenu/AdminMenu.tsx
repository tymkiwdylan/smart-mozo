import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Card, CardContent, CardMedia, Box, Button } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import EditMenu from '../EditMenu/EditMenu';
import { sendPostRequest } from '../../api/apiUtils';


interface Props {
  items: MenuItem[];
  onDeleteItem: (item: MenuItem) => void;
}

const ItemList: React.FC<Props> = ({ items, onDeleteItem }) => {
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
    try {
      const response = await sendPostRequest(formData, '/create-menu-item');
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
        <Button
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
          <Card key={item.id} style={{ marginBottom: '10px' }}>
            <ListItem>
              <CardMedia
                component="img"
                alt={item.plate}
                style={{ width: '200', height: '100', objectFit: 'cover' }}
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
