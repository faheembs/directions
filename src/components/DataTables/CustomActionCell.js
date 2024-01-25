import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';

const CustomActionsCell = ({ handleEdit, handleDelete, row }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        handleEdit(row.id);
        handleClose();
    };

    const handleDeleteClick = () => {
        handleDelete(row.id);
        handleClose();
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
                variant='outlined'
                sx={{
                    color: 'blue', textTransform: 'none', mr: 1, "&:hover": {
                        backgroundColor: 'blue',
                        color: 'white',
                        borderColor: 'blue'
                    }
                }}
                onClick={handleClick}
            >
                Edit
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </Menu>
        </Box>
    );
};

export default CustomActionsCell;
