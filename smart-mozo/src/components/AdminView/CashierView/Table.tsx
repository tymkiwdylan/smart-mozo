import React from 'react';
import { Paper, Typography } from '@mui/material';

interface TableProps {
  tableNumber: number;
  onClick: () => void;
}

const Table: React.FC<TableProps> = ({ tableNumber, onClick }) => {
  return (
    <Paper
      elevation={3}
      sx={{ padding: 2, textAlign: 'center', cursor: 'pointer' }}
      onClick={onClick}
    >
      <Typography variant="h5" gutterBottom>
        Table {tableNumber}
      </Typography>
    </Paper>
  );
};

export default Table;
