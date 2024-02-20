import React, { useEffect, useState } from 'react'
import { Badge, Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import ActionButton from './ActionButton';
import UserActions from './userActions';
import { io } from 'socket.io-client';


// const user = localStorage.getItem('usersInfo')
// const users = JSON.parse(user)
// console.log('user id from local', JSON.parse(users._id))
export const userColumns = [
  {
    field: "firstname",
    headerName: "First Name",
    width: 300,
    renderCell: (params) => {

      useEffect(() => {

        const user = localStorage.getItem('usersInfo')

        const users = JSON.parse(user)
        console.log('user id from local', users._id)
        const socket = io('http://localhost:8000');
        socket.on("message", (message) => {
          console.log("Received message from server:", message);
          // console.log("userId from table", params)
          // socket.on("userOnlineStatus", ({ userId, online }) => {
          //   // const statusMessage = online ? "Online" : "Offline";
          //   console.log(`User ${userId} is ${statusMessage}`)
          // });

        });
        socket.emit("login", users._id);
        const handleDisconnect = () => {
          socket.emit('disconnectRequest', users._id);
          socket.disconnect();
        };

        window.addEventListener('beforeunload', handleDisconnect);

        return () => {
          window.removeEventListener('beforeunload', handleDisconnect);
        };
      }, [])
      return (
        <>
          <Badge
            color={params.row.online ? 'success' : 'secondary'}
            variant="dot"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

          />
          <Typography sx={{ ml: 2 }}>
            {params.row.firstname}
          </Typography>

        </>
      )
    }
  },
  { field: "lastname", headerName: "Last Name", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "createdAt", headerName: "Date Created", width: 150 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return <UserActions selectedUserId={params.row.id} premiumDatasets={params.row.premiumDatasets} />
    }
  },

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