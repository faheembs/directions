import React, { useState } from 'react'
import { Box, Button, Menu, MenuItem } from '@mui/material';



export const userColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 200,
    display: "flex",
    justifyContent: "center",
  },
  { field: "createdAt", headerName: "Date Created", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    renderCell: (params) => (
      <Box
        display="flex"
        alignItems="center"
        sx={{ borderRadius: "29px", py: 2 }}
      >
        Active
      </Box>
    ),
  },
  { field: "owner", headerName: "User", width: 150 },
];

export const userRows = [
  {
    id: 1,
    createdAt: "2024-01-25",
    owner: "John Doe",
  },
  {
    id: 2,
    createdAt: "2024-01-24",
    owner: "Jane Smith",
  },
  {
    id: 3,
    createdAt: "2024-01-23",
    owner: "Bob Johnson",
  },
];

export const datasetColumns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "name", headerName: "Dataset Name", width: 150 },
  { field: "description", headerName: "Description", width: 150 },
  { field: "status", headerName: "Dataset Type", width: 150, },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => {
      const [anchorEl, setAnchorEl] = useState(null);

      const handleEditClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleEditClose = () => {
        setAnchorEl(null);
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
            onClick={handleEditClick}
          >
            Edit
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleEditClose}
          >
            <MenuItem onClick={() => handleEdit(params.row.id)}>Free</MenuItem>
            <MenuItem onClick={() => handleEdit(params.row.id)}>Premium</MenuItem>
          </Menu>
          <Button
            variant='outlined'
            sx={{
              color: 'red', textTransform: 'none', "&:hover": {
                backgroundColor: 'red',
                color: 'white',
                borderColor: 'red',
              },
              borderColor: 'red'
            }}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      );
    }
  },
];

export const datasetRows = [
  { id: 1, name: "Dataset A", description: "Lorem ipsum", status: "Premium" },
  { id: 2, name: "Dataset B", description: "Lorem ipsum", status: "Free" },
  { id: 3, name: "Dataset C", description: "Lorem ipsum", status: "Premium" },
  { id: 4, name: "Dataset D", description: "Lorem ipsum", status: "Free" },
];
const handleEdit = (id) => {
  console.log(`Editing dataset with ID: ${id}`);
};

const handleDelete = (id) => {
  console.log(`Deleting dataset with ID: ${id}`);
};