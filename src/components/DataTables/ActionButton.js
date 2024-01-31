import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteDataset, getAllDatasets, updateIsPremium } from "../../features/Dataset/DatasetAction";
import { Box, Button, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const ActionButton = ({ datasetId }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
    dispatch(getAllDatasets({}));
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
        <MenuItem onClick={() => handleEdit(false)}>Free</MenuItem>
        <MenuItem onClick={() => handleEdit(true)}>Premium</MenuItem>
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
        onClick={handleDeleteClick}
      >
        Delete
      </Button>

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
