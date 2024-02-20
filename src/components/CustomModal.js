import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export const CustomModal = ({ children, handleClose, open, modalStyle, containerStyle }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                sx={containerStyle}
            >
                <Box sx={modalStyle}>{children}</Box>
            </Modal>
        </div>
    );
}

export default CustomModal;
