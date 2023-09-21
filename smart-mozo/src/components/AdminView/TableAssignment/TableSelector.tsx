import React, { useEffect, useState } from "react";
import "./styles.css";
import { ButtonBase, Grid, Modal, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { sendPostRequest } from "../../../api/apiUtils";
import { setWaiterTables } from "../../../store/restaurantSlice";

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
  const [tables, setTable] = useState(restaurantTables);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTable(restaurantTables);
  }, [restaurantTables]);
  console.log(selectedTables);
  
  const handleTableClick = (tableNumber: Table) => {
    setSelectedTables((prevSelectedTables) => {
      if (prevSelectedTables.some((table) => table.id === tableNumber.id)) {
        // If the table is already selected, remove it from the list
        return prevSelectedTables.filter((table) => table.id !== tableNumber.id);
      } else {
        // If the table is not selected, add it to the list
        return [...prevSelectedTables, tableNumber];
      }
    });
  };

  const isTableSelected = (tableId: number) => {
    return selectedTables.some((table) => table.id === tableId);
  };

  const handleConfirm = async () => {
    // Perform actions with selected waiter and tables here
    try {
        const response = await sendPostRequest({waiter_id: selectedWaiter.id, tables: selectedTables}, 'restaurant/assign-tables');
        dispatch(setWaiterTables({waiterId: selectedWaiter.id, tables: response.data.tables}));
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
                    isTableSelected(table.id) ? "selected" : ""
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
