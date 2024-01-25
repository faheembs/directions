import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UserCircleIcon from "../../../assets/userCircle.png";
import InputProfile from "./InputProfile";
import CancelIcon from "../../../assets/Cancel.png";

const Profile = () => {

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState("  ");
  const [open, setOpen] = useState(false);



  const handleOnChange = (key, e) => {
    let temp = formData;
    temp[key] = e.target.value;
    setFormData({ ...temp });
    console.log("temp", temp);
  };
  console.log("formData", formData);
  const handleDeleteAccount = () => {
    setOpen(true);
  };
  const handleYes = async () => {
    setOpen(false);
  };
  const handleNo = () => {
    setOpen(false);
  };
  const handleUpdateProfile = async () => {
    console.log("first")
  };
  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };
  return (
    <>
      <Dialog open={open}>
        <Paper sx={{ height: 150, width: 400, pt: 2 }}>
          <DialogTitle sx={{ textAlign: "center" }}>
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogActions
            sx={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={handleYes}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={handleNo}
            >
              No
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
      <Box
        sx={{
          backgroundColor: "#FBFCFE",
          pt: 4,
          mb: 2,
          borderRadius: 4,
          border: "1px solid #A0A0A0",
        }}
      >
        <Container>
          <Grid container spacing={1}>
            <Grid
              item
              md={12}
              lg={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box component="img" src={UserCircleIcon} width={180} height={180} />
            </Grid>
            {/* <Grid item md={12} lg={12} sx={{ my: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  ml: 6,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "#FFE3E5",
                    px: 0,
                    color: "#FF1212",
                    borderColor: "#DAC0C0",
                    display: "flex",
                    justifyContent: "space-between",
                    "&:hover": {
                      backgroundColor: "#FFE3E5",
                      borderColor: "#DAC0C0",
                      borderRadius: "4.32px",
                    },
                  }}
                  onClick={handleDeleteAccount}
                >
                  <Box component="img" src={CancelIcon} height={28} width={28} />
                  <Typography
                    variant="body1"
                    sx={{
                      px: "6px",
                      textTransform: "none",
                      fontWeight: 500,
                    }}
                  >
                    Delete Account
                  </Typography>
                </Button>
              </Box>
            </Grid> */}
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <InputProfile
                  label="First Name:"
                  value={
                    formData?.name
                      ? formData?.name
                      : formData?.first_name
                        ? formData?.first_name
                        : ""
                  }
                  onChangeField={(e) => handleOnChange("first_name", e)}
                  disabled={!isEditMode}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <InputProfile
                  label="Last Name:"
                  value={formData?.last_name}
                  onChangeField={(e) => handleOnChange("last_name", e)}
                  disabled={!isEditMode}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <InputProfile
                  label="Email:"
                  value={formData?.email}
                  onChangeField={(e) => handleOnChange("email", e)}
                  disabled={!isEditMode}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <InputProfile label="Password:" disabled={!isEditMode} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <InputProfile
                  label="Confirm Password:"
                  disabled={!isEditMode}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  ml: 6,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{ color: "#0380FF", fontSize: 19, textTransform: "none" }}
                  onClick={handleEditClick}
                >
                  Edit <EditIcon sx={{ mx: 2 }} />
                </Button>
                {isEditMode === true ? (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                    sx={{ display: "flex", justifyContent: "flex-start", py: 2 }}
                  >
                    <Button
                      variant="contained"
                      sx={{ fontSize: 19, textTransform: "none", px: 8 }}
                      onClick={handleUpdateProfile}
                    >
                      Update
                    </Button>
                  </Grid>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default Profile;
