import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Card, CardContent, Box, Button } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import EditWaiter from './EditWaiter';
import { sendPostRequest } from '../../../api/apiUtils';


interface Props {
  items: Waiter[];
  onDeleteItem: (item: Waiter) => void;
  onEditItem: (item: Waiter) => void;
  onAddItem: (item: Waiter) => void;
}

const ItemList: React.FC<Props> = ({ items, onDeleteItem, onEditItem, onAddItem }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Waiter | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);

  const handleEditItem = (item: Waiter|null) => {
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
      const response = await sendPostRequest(formData, 'waiter/add-waiter');

      if (isNewItem) {
        onAddItem(response.data);
        setIsNewItem(false);
      }
      else {
        onEditItem(response.data);
      }
    }
    catch (error) {
      console.log(error);
    }

  };

  return (
    <Box sx={{
            width: 350,
            height: '100vh',
            maxHeight: '85vh',
            overflowY: 'scroll',
            }}>
        <Button
            color='secondary'
            variant="outlined"
            startIcon={<Add />}
            onClick={() => {
            setIsNewItem(true);
            setSelectedItem(null);
            handleEditItem(selectedItem);
            }}
            style={{ marginBottom: '10px' }}
        >
        Nuevo Mozo
      </Button>
      <List>
        {items.map(item => (
          <Card key={item.id} style={{ marginBottom: '10px', borderRadius: '8px' }}>
            <ListItem>
              <CardContent>
                <ListItemText
                  primary={item.name}
                  secondary={`email: ${item.email}`}
                />
                <ListItemText primary={'Mesas: 1, 7, 12'} />
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
        
      <EditWaiter open={openModal} onClose={handleCloseModal} onSubmit={handleSubmit} waiter={selectedItem} />

    </Box>
  );
};

export default ItemList;
