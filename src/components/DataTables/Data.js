import React, { useState } from 'react'
import { Badge, Box, Checkbox, MenuItem, Popover, Typography } from '@mui/material';
import ActionButton from './ActionButton';
import UserActions from './UserActions';
import { useDispatch } from 'react-redux';
import { getAllUsers, updateCombinePermission, updateExportDataPermission } from '../../features/Users/usersAction';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


export const userColumns = [
  {

    field: "firstname",
    headerName: "First Name",
    width: 160,
    renderCell: (params) => {
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
  { field: "lastname", headerName: "Last Name", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "createdAt", headerName: "Date Created", width: 150 },
  {
    field: "exportPermission", headerName: "Export Data", width: 150,
    renderCell: (params) => {
      const [anchorEl, setAnchorEl] = useState(null);
      const dispatch = useDispatch()
      const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleMenuClose = () => {
        setAnchorEl(null);
      };

      const handleChange = async (event) => {
        const isAllowed = event.target.checked;
        await dispatch(updateExportDataPermission({ body: { allowExportData: isAllowed }, userId: params.row.id }));
        dispatch(getAllUsers({}))
        handleMenuClose();

      };

      return (
        <Checkbox
          checked={params.row.exportPermission}
          onChange={handleChange}
          color="primary"
          inputProps={{ 'aria-label': 'Export Data Checkbox' }}
          sx={{ '& .MuiSvgIcon-root': { color: 'black', ml: 2 } }}

        />
      )

    }
  },
  {
    field: "combineDatasetPermission", headerName: "Combine Datasets", width: 150,
    renderCell: (params) => {
      const [anchorEl, setAnchorEl] = useState(null);
      const dispatch = useDispatch()
      const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleMenuClose = () => {
        setAnchorEl(null);
      };

      const handleChange = async (event) => {
        const isAllowed = event.target.checked;
        await dispatch(updateCombinePermission({ body: { allowCombineDatasets: isAllowed }, userId: params.row.id }));
        dispatch(getAllUsers({}))
        handleMenuClose();

      };
      return (
        <Checkbox
          checked={params.row.combineDatasetPermission}
          onChange={handleChange}
          color="primary"
          inputProps={{ 'aria-label': 'Combine Datasets Checkbox' }}
          sx={{ '& .MuiSvgIcon-root': { color: 'black', ml: 4 } }}
        />
      )

    }
  },

  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return <UserActions selectedUserId={params.row.id} premiumDatasets={params.row.premiumDatasets} />
    }
  },

];



export const datasetColumns = [
  { field: "name", headerName: "Dataset Name", width: 200 },
  { field: "addedBy", headerName: "Added by", width: 180 },
  { field: "ownerEmail", headerName: "Owner's Email", width: 200 },
  {
    field: "isCombined", headerName: "Combined Dataset", width: 170,
    renderCell: (params) => {
      console.log('params.row.isCombined', params.row.isCombined)
      return (
        <>
          {params.row.isCombined === true ?
            <Typography sx={{ ml: 6 }} variant='body1'> Yes </Typography>
            : <Typography sx={{ ml: 6 }} variant='body1' >No</Typography>
          }
        </>
      )
    }
  },
  {
    field: "status", headerName: "Dataset Type", width: 170,

    renderCell: (params) => {
      return (
        <>
          {params.row.status === false ? <Typography sx={{ ml: 2 }} variant='body1'>Free</Typography> :
            <Typography sx={{ ml: 2 }} variant='body1'>Premium</Typography>
          }
        </>
      )
    }
  },
  { field: "createdAt", headerName: "Date Created", width: 150 },
  {
    field: "actions",
    headerName: "Actions",
    width: 140,
    renderCell: (params) => {
      const user = localStorage.getItem('usersInfo')
      const users = JSON.parse(user)
      return <ActionButton role={users.role} datasetId={params.row.id} />
    }
  },
];


