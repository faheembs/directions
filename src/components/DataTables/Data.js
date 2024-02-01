import React, { useState } from 'react'
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import ActionButton from './ActionButton';



export const userColumns = [
  {
    field: "firstname",
    headerName: "First Name",
    width: 300,
  },
  { field: "lastname", headerName: "Last Name", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "createdAt", headerName: "Date Created", width: 300 },
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
  { field: "name", headerName: "Dataset Name", width: 250 },
  { field: "description", headerName: "Description", width: 400 },
  {
    field: "status", headerName: "Dataset Type", width: 300,

    renderCell: (params) => {
      return (
        <>
          {params.row.status === false ? <Typography variant='body1'>Free</Typography> :
            <Typography variant='body1'>Premium</Typography>
          }
        </>
      )
    }

  },
  {
    field: "actions",
    headerName: "Actions",
    width: 250,
    renderCell: (params) => {
      return <ActionButton datasetId={params.row.id} />
    }
  },
];

export const datasetRows = [
  { id: 1, name: "Dataset A", description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum", status: "Premium" },
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