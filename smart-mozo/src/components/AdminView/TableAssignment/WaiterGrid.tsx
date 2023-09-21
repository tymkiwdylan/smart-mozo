import React, { useState } from "react";
import "./styles.css";
import { ButtonBase, Modal } from "@mui/material";
import TableSelector from "./TableSelector"; // Assuming you've created the TableGrid component

interface WaiterGridProps {
  waiters: Waiter[];
}

const WaiterGrid: React.FC<WaiterGridProps> = ({ waiters }) => {
  const [selectedWaiter, setSelectedWaiter] = useState<Waiter|null>(null);

  const handleWaiterClick = (waiter: Waiter) => {
    setSelectedWaiter(waiter);
  };

  const handleCloseModal = () => {
    setSelectedWaiter(null);
  };

  return (
    <div className="waiter-grid">
      {waiters.map((waiter, index) => (
        <ButtonBase key={index} onClick={() => handleWaiterClick(waiter)}>
          <div className="waiter">{waiter.name}</div>
        </ButtonBase>
      ))}
      <Modal open={Boolean(selectedWaiter)} onClose={handleCloseModal}>
        <div className="table-modal">
          {selectedWaiter && (
            <TableSelector
              selectedWaiter={selectedWaiter}
              onCloseModal={handleCloseModal}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default WaiterGrid;
