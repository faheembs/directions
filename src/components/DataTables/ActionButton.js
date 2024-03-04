import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteDataset, getAllDatasets, getDatasetsByUserId, updateIsPremium } from "../../features/Dataset/DatasetAction";
import { Box, Button, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const ActionButton = ({ datasetId, role }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);


  const userData = localStorage.getItem('usersInfo');
  const usersData = JSON.parse(userData);

  const handleEdit = async (val) => {
    await dispatch(updateIsPremium({ datasetId: datasetId, isPremium: val }));
    dispatch(getAllDatasets({}));
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteDataset(datasetId));
    if (usersData?.role === "admin") {
      dispatch(getAllDatasets({}));
    } else {
      dispatch(getDatasetsByUserId({ userId: usersData?._id }))

    }
    setAnchorEl(null);
    setOpenDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  const handleEditClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
      {role == "admin" && (<IconButton
        onClick={handleEditClick}
        sx={{ mr: 2 }}
      >
        <EditIcon sx={{ color: 'black' }} />
      </IconButton>)}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleEditClose}
      >
        <MenuItem onClick={() => handleEdit(false)}>Free</MenuItem>
        <MenuItem onClick={() => handleEdit(true)}>Premium</MenuItem>
      </Menu>


      <IconButton
        color="error"
        onClick={handleDeleteClick}
      >
        <DeleteIcon sx={{ color: 'grey', ml: role === "admin" ? "-14px" : '5px' }} />
      </IconButton>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={openDeleteModal}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting this item cannot be undone. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActionButton;
