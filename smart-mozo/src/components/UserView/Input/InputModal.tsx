import React, { useState } from 'react';
import { Button, Modal, TextField, Typography } from '@mui/material';


interface InputModalProps {
    open: boolean;
    onAccept: (name: string) => void;
    }

const InputModal: React.FC<InputModalProps> = ({open, onAccept}) => {
    const [name, setName] = useState('');

    const handleAccept = () => {
        // Do something with the entered name, e.g., send it to a server
        onAccept(name);
    };

    return (
        <Modal open={open} style={{
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
             }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
                <Typography variant="h6">Enter your name</Typography>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <Button variant="contained" color="primary" onClick={handleAccept}>
                    Aceptar
                </Button>
            </div>
        </Modal>
    );
};

export default InputModal;
