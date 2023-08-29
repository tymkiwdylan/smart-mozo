import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Card, CardContent, Box, Button } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import EditCook from './EditCook';
import { sendPostRequest } from '../../../api/apiUtils';


interface Props {
  items: Cook[];
  onDeleteItem: (item: Cook) => void;
  onEditItem: (item: Cook) => void;
  onAddItem: (item: Cook) => void;
}

const ItemList: React.FC<Props> = ({ items, onDeleteItem, onEditItem, onAddItem }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Cook | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);

  const handleEditItem = (item: Cook|null) => {
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
      const response = await sendPostRequest(formData, 'cook/add-cook');
      console.log(isNewItem);
      if (isNewItem) {
        console.log('Adding new cook: ', response.data);
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
        Nuevo Cocinero
      </Button>
      <List>
        {items.map(item => (
          <Card key={item.id} style={{ marginBottom: '10px', borderRadius: '8px' }}>
            <ListItem>
              <CardContent>
                <ListItemText
                  primary={item.name}
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
        
      <EditCook open={openModal} onClose={handleCloseModal} onSubmit={handleSubmit} cook={selectedItem} />

    </Box>
  );
};

export default ItemList;
