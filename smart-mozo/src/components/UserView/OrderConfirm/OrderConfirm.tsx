import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Grid,
  Paper,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";

interface Props {
  items: MenuItem[];
  open: boolean;
  onDeleteItem: (index: number) => void;
  onSubmit: () => void;
  onClose: () => void;
  setNote: (note: string) => void;
}

const OrderConfirm: React.FC<Props> = ({
  items,
  open,
  onDeleteItem,
  onSubmit,
  setNote,
  onClose
}) => {
  return (
    <Modal
      open={open}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          height: "80vh", // Set a fixed height for the modal
          position: "relative" // Create a positioning context for absolute elements
        }}
      >
        <Paper
          sx={{
            width: "90%",
            maxHeight: "80vh", // Keep the maxHeight consistent with modal's max height
            minHeight: "80vh",
            overflowY: "auto", // Use 'auto' to enable scroll only when necessary
            scrollbarColor: "#f2f4f7 #f2f4f7",
            borderRadius: "8px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={onClose}
              style={{
                zIndex: 2
              }}
            >
              <Close />
            </IconButton>
          </div>

          <Typography
            variant="h4"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            Confirmar Pedido
          </Typography>
          <List style={{ marginBottom: "4rem" }}>
            {items.map((item, index) => (
              <Grid key={item.id} item xs={12} sm={6} md={4}>
                <Card style={{ marginBottom: "10px", borderRadius: "8px" }}>
                  <ListItem>
                    <CardMedia
                      component="img"
                      alt={item.plate}
                      style={{
                        maxWidth: "200px",
                        maxHeight: "100px",
                        objectFit: "cover"
                      }}
                      image={item.img}
                    />
                    <CardContent>
                      <ListItemText
                        primary={item.plate}
                        secondary={`Price: $${item.price.toFixed(2)}`}
                      />
                    </CardContent>
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDeleteItem(index)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Card>
              </Grid>
            ))}
          </List>
        </Paper>

        <BottomNavigation
          value={0}
          showLabels
          style={{
            width: "90%",
            padding: "1rem",
            position: "absolute",
            bottom: 0,
            borderRadius: "8px"
          }}
        >
          <BottomNavigationAction
            label="Confirmar Pedido"
            style={{ color: "green" }}
            onClick={onSubmit}
          />
        </BottomNavigation>
      </div>
    </Modal>
  );
};

export default OrderConfirm;
