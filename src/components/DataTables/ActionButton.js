import { useEffect, useState } from "react";
import { itemsImageURL } from "../../constants/baseURL";
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
  ImageList,
  ImageListItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  updateApproval,
  updateRejection,
} from "../../features/approval/approvalAction";
import {
  getAllItems,
  getItemPerId,
  getItembyUserId,
  updateDeliverable,
} from "../../features/items/itemActions";
import CustomModal from "../CustomModal";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { activateUser, disableUser, getAllUsers } from "../../features/users/usersAction";
import RejectionDialog from "./RejectionDialog";

const ActionButton = ({
  itemId,
  isUserTable,
  userId,
  isUserLayoutTable,
  uid,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { itemPerIdInfo, updateDeliverableItem } = useSelector(
    (state) => state.item
  );



  // console.log("item per -------->", itemPerIdInfo)

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenModal = async (itemId) => {
    await dispatch(getItemPerId({ id: itemId }));
    setOpen(true);
    handleClose();
  };
  const handleCloseModal = () => setOpen(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => setDialogOpen(false);

  const handleApprove = async (itemId) => {
    await dispatch(updateApproval({ id: itemId }));
    toast.success("Η κατάσταση της αγγελίας ενημερώθηκε.");
    dispatch(getAllItems({}));
    handleClose();
  };
  const handleReject = async (keyWord) => {
    await dispatch(updateRejection({ id: itemId, body: { reason: keyWord } }));
    toast.success("Η κατάσταση της αγγελίας ενημερώθηκε.");
    dispatch(getAllItems({}));
    handleClose();
  };
  const handleUserDelete = async (userId) => {
    console.log("user ID", userId);
    await dispatch(disableUser({ id: userId }));
    dispatch(getAllUsers({}));
    toast.success("Ο χρήστης απενεργοποιήθηκε επιτυχώς.");
  };

  const handleUserActive = async (id) => {
    console.log(id)
    await dispatch(activateUser({ id: id }));
    dispatch(getAllUsers({}));
    toast.success("Ο χρήστης απενεργοποιήθηκε επιτυχώς.");
  }

  const handleUpdateDeliver = async (userId) => {
    console.log("user ID", userId);
    const response = await dispatch(updateDeliverable({ userId: userId, uid: uid }));
    console.log(response)
    dispatch(getItembyUserId({ userId: uid }));
    if (response) {
      toast.success('Η κατάσταση της αγγελίας ενημερώθηκε.');
    } else {
      return null;
    }
  };
  const formatPickupTime = (pickupTime) => {
    const date = new Date(pickupTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  const modalStyle1 = {
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    width: 700,
    height: 656,
  };

  const containerStyle1 = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    left: "0",
    height: "100vh",
    width: "100vw",
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex=start",
        color: "#0380FF",
        mx: 4,
      }}
    >
      <RejectionDialog
        open={dialogOpen}
        rejectHandler={handleReject}
        handleClose={() => handleCloseDialog()}
      />
      <CustomModal
        open={open}
        handleClose={() => handleCloseModal()}
        modalStyle={modalStyle1}
        containerStyle={containerStyle1}
      >
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleCloseModal()}
            />
          </Box>
          <Box>
            <Typography
              sx={{ display: "flex", justifyContent: "center", mb: 2 }}
              variant="h5"
              fontWeight="bold"
            >
              Πληροφορίες Αντικειμένου
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" component="h2">
              Όνομα: {itemPerIdInfo.name}
            </Typography>
            <Typography variant="h6">
              Ποσότητα: {itemPerIdInfo.quantity}
            </Typography>
            <Typography variant="h6">
              Πλάτος: {itemPerIdInfo.width_cm}
            </Typography>
            <Typography variant="h6">
              Ύψος: {itemPerIdInfo.height_cm}
            </Typography>
            <Typography variant="h6" component="h2">
              Μήκος: {itemPerIdInfo.length_cm}
            </Typography>
            <Typography variant="h6" component="h2">
              Περιγραφή: {itemPerIdInfo.description}
            </Typography>
            <Typography variant="h6" id="modal-modal-description">
              Διεύθυνση: {itemPerIdInfo.address}
            </Typography>
            <Typography variant="h6">
              Ταχυδρομικός κώδικας: {itemPerIdInfo.zip_code}
            </Typography>
            <Typography variant="h6">
              Παράδοση:{" "}
              {itemPerIdInfo.deliverable &&
                getItemPerId.deliverable === "onhold" ? (
                <> Δεν παραδόθηκε </>
              ) : (
                <> Παραδόθηκε</>
              )}
            </Typography>
            <Typography variant="h6">
              Ώρ.& Ημ. παραλαβής : {itemPerIdInfo.pick_up_hours}
            </Typography>
            <ImageList
              sx={{ width: 400, height: 550 }}
              cols={3} // Set the number of columns to 3
              rowHeight={180}
            >
              {itemPerIdInfo.photos ? (
                itemPerIdInfo.photos.map((photo, index) => (
                  <ImageListItem
                    key={index}
                    sx={{ cursor: "pointer" }}
                  >
                    <img
                      src={`${itemsImageURL}${photo?.substring(
                        67
                      )}?w=300&h=180&fit=crop&auto=format&dpr=2 2x`}
                      alt={`product-image-${index}`}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))
              ) : (
                <span>Δεν υπάρχουν φωτογραφίες</span>
              )}
            </ImageList>
          </Box>
        </Box>
      </CustomModal>
      <EditIcon onClick={handleClick} />
      {isUserTable ? (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          PaperProps={{
            sx: {
              borderRadius: 4,
            },
          }}
        >
          <MenuItem onClick={() => handleUserDelete(userId)}>
            Απενεργοποίηση χρήστη
          </MenuItem>
          <MenuItem onClick={() => handleUserActive(userId)}>
            Ενεργοποίηση χρήστη
          </MenuItem>

        </Menu>
      ) : isUserLayoutTable ? (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          PaperProps={{
            sx: {
              borderRadius: 4,
            },
          }}
        >
          <MenuItem onClick={() => handleUpdateDeliver(userId)}>
            Παραδόθηκε
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          PaperProps={{
            sx: {
              borderRadius: 4,
            },
          }}
        >
          <MenuItem onClick={() => handleApprove(itemId)}>Αποδοχή</MenuItem>
          <Divider sx={{ mx: 1 }} />
          <MenuItem onClick={() => handleOpenDialog(itemId)}>Απόρριψη</MenuItem>
          <Divider sx={{ mx: 1 }} />
          <MenuItem onClick={() => handleOpenModal(itemId)}>
            Δες τις λεπτομέρειες
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
};

export default ActionButton;
