import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import { ButtonBase, IconButton, Menu, MenuItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { sendPostRequest } from '../../../api/apiUtils';

interface TableGridProps {
  tables: Table[];
}

const TableGrid: React.FC<TableGridProps> = ({ tables }) => {
  const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>({});
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const menuRefs = useRef<Array<HTMLDivElement | null>>([]);

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
            sendPostRequest({table_id: selectedTable.id}, 'restaurant/delete-table');
        }
    }


  return (
    <div className="table-grid">
      {tables.map((table, index) => (
        <ButtonBase key={index}>
          <div
            ref={(ref) => (menuRefs.current[index] = ref)}
            className="table"
            onClick={() => {
                toggleMenu(index);
                setSelectedTable(table);    
            }
        }
          >
            {table.number}
            <Menu
              open={openMenus[index] || false}
              anchorEl={menuRefs.current[index]}
              onClose={() => toggleMenu(index)}
            >
              <MenuItem>
              <IconButton onClick={handleDelete}>
                <DeleteIcon/>
              </IconButton>
              </MenuItem>
            </Menu>
          </div>
        </ButtonBase>
      ))}
    </div>
  );
};

export default TableGrid;
