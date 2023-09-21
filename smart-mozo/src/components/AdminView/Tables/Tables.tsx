import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import { Button, ButtonBase, IconButton, Menu, MenuItem, Modal, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { sendPostRequest } from '../../../api/apiUtils';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {setTables } from '../../../store/restaurantActions';

interface TableGridProps {
  tables: Table[];
}

const TableGrid: React.FC<TableGridProps> = ({ tables }) => {
  const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>({});
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const menuRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState('');
  const [tableList, setTable] = useState<Table[]>(tables);

  const restaurant_id = useAppSelector((state) => state.restaurant.restaurant.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      menuRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(event.target as Node)) {
          setOpenMenus((prevOpenMenus) => ({
            ...prevOpenMenus,
            [index]: false,
          }));
        }
      });
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleMenu = (index: number) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [index]: !prevOpenMenus[index],
    }));
  };

  const handleDelete = () => {
    if (selectedTable) {
      sendPostRequest({ table_id: selectedTable.id }, 'restaurant/delete-table');
      const updatedTables = tableList.filter((table) => table.id !== selectedTable.id)
      setTable(updatedTables);
      dispatch(setTables(updatedTables));
    }
  };

  const handleAddTable = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewTableNumber('');
  };

  const handleTableNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTableNumber(event.target.value);
  };

  const handleAddTableConfirm = async () => {
    const response = await sendPostRequest({number: newTableNumber, restaurant_id: restaurant_id}, 'restaurant/add-table');
    setTable([...tableList, response.data]);
    dispatch(setTables([...tableList, response.data]));
    handleModalClose();
  };

  return (
    <div className="table-grid">
      {tableList.map((table, index) => (
        <ButtonBase key={index}>
          <div
            ref={(ref) => (menuRefs.current[index] = ref)}
            className="table"
            onClick={() => {
              toggleMenu(index);
              setSelectedTable(table);
            }}
          >
            {table.number}
            <Menu open={openMenus[index] || false} anchorEl={menuRefs.current[index]} onClose={() => toggleMenu(index)}>
              <MenuItem>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </MenuItem>
            </Menu>
          </div>
        </ButtonBase>
      ))}
      <Button variant='contained' style={{color: 'red'}} onClick={handleAddTable}>Add table</Button>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <div className="modal-content">
          <TextField
            type='number'
            label="Table Number"
            variant="outlined"
            value={newTableNumber}
            onChange={handleTableNumberChange}
          />
          <Button onClick={handleAddTableConfirm} variant='contained' style={{color: 'green'}}>Add</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TableGrid;
