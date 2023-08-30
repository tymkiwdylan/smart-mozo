import React, { useEffect, useState } from "react";
import "./styles.css";
import { ButtonBase, Grid, Modal, Button } from "@mui/material";
import { useAppSelector } from "../../../store/hooks";
import { sendPostRequest } from "../../../api/apiUtils";

interface TableGridProps {
  selectedWaiter: Waiter;
  onCloseModal: () => void;
}

const TableSelector: React.FC<TableGridProps> = ({
  selectedWaiter,
  onCloseModal
}) => {
  const restaurantTables = useAppSelector((state) => state.restaurant.restaurant.tables);
  const [selectedTables, setSelectedTables] = useState<Table[]>(selectedWaiter.tables);
  const [tables, setTables] = useState(restaurantTables);

  useEffect(() => {
    setTables(restaurantTables);
  }, [restaurantTables]);


  const handleTableClick = (tableNumber: Table) => {
    setSelectedTables((prevSelectedTables) => {
      if (prevSelectedTables.includes(tableNumber)) {
        return prevSelectedTables.filter((table) => table !== tableNumber);
      } else {
        return [...prevSelectedTables, tableNumber];
      }
    });
  };

  const handleConfirm = () => {
    // Perform actions with selected waiter and tables here
    try {
        sendPostRequest({waiter_id: selectedWaiter.id, tables: selectedTables}, 'restaurant/assign-tables');
    }
    catch (error) {
        console.error('Error sending data:', error);
    }
    onCloseModal();
  };

  return (
    <Modal open={true} onClose={onCloseModal}>
      <div className="table-modal">
        <h2>Select Tables for {selectedWaiter.name}</h2>
        <Grid container spacing={2}>
          {tables.map(
            (table, _index) => (
              <Grid item xs={2} key={table.id}>
                <ButtonBase
                  onClick={() => handleTableClick(table)}
                  className={`table ${
                    selectedTables.includes(table) ? "selected" : ""
                  }`}
                >
                  {table.number}
                </ButtonBase>
              </Grid>
            )
          )}
        </Grid>
        <Button variant="contained" onClick={handleConfirm} style={{marginTop: '2rem'}}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default TableSelector;
