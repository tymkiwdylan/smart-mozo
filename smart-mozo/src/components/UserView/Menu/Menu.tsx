import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface MenuProps {
  items: MenuItem[];
  onAdd: (menuItem: MenuItem) => void;
}

const Menu: React.FC<MenuProps> = ({ items, onAdd }) => {
  return (
    <Grid container spacing={3}>
      {items.map((menuItem) => {
        const { id, plate, img, price, description } = menuItem;

        const handleAddClick = () => {
          onAdd(menuItem);
        };

        return (
          <Grid key={id} item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia component="img" height="140" image={img} alt={plate} />
              <CardContent>
                <Typography variant="h5" component="div">
                  {plate}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  ${price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {description}
                </Typography>
              </CardContent>
              <CardActionArea onClick={handleAddClick} aria-label="añadir a la orden" >
                  <AddIcon />
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Menu;
