import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import InputProfile from './InputProfile'; // Adjust the import path based on your project structure
import { useDispatch } from 'react-redux';
import { editUser } from '../../../features/Users/usersAction';



const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [disabledFields, setDisabledFields] = useState(true);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phoneNumber: '',
  });

  const dispatch = useDispatch()
  const data = localStorage.getItem("usersInfo");
  const userData = JSON.parse(data)

  console.log("User Data ------>", profileData)
  useEffect(() => {
    const data = localStorage.getItem("usersInfo");
    const userData = JSON.parse(data);
    setProfileData(userData);
  }, []);


  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
    setDisabledFields((prevDisabledFields) => !prevDisabledFields);
  };
  const saveProfile = () => {

    console.log('Profile saved:', profileData);
    dispatch(editUser({
      userId: userData.id,
      body: {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
      },
    }));

    setDisabledFields(true);
    setEditMode(false);
  };

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <InputProfile
            label="First Name"
            placeholder="Enter first name"
            value={userData.firstName}
            onChangeFeild={(e) => handleInputChange(e, 'firstName')}
            disabled={disabledFields}
          />
        </Grid>
        <Grid item xs={6}>
          <InputProfile
            label="Last Name"
            placeholder="Enter last name"
            value={userData.lastName}
            onChangeFeild={(e) => handleInputChange(e, 'lastName')}
            disabled={disabledFields}
          />
        </Grid>
        <Grid item xs={6}>
          <InputProfile
            label="Email"
            placeholder="Enter email"
            value={userData.email}
            onChangeFeild={(e) => handleInputChange(e, 'email')}
            disabled={disabledFields}
          />
        </Grid>
        <Grid item xs={6}>
          <InputProfile
            label="Gender"
            placeholder="Enter gender"
            value={"Male"}
            onChangeFeild={(e) => handleInputChange(e, 'gender')}
            disabled={disabledFields}
          />
        </Grid>
        <Grid item xs={6}>
          <InputProfile
            label="Phone Number"
            placeholder="Enter phone number"
            value={"123456789"}
            onChangeFeild={(e) => handleInputChange(e, 'phoneNumber')}
            disabled={disabledFields}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: "flex-end" }}>
          {!editMode && (
            <Button
              variant="outlined"
              sx={{
                borderColor: 'black',
                backgroundColor: 'black',
                color: 'white',
                px: 3,
                "&:hover": {
                  color: 'black',
                  backgroundColor: 'white',
                  borderColor: 'black',
                },
                textTransform: 'none',
              }}
              onClick={toggleEditMode}
            >
              Edit
            </Button>
          )}
          {editMode && (
            <Button
              variant="outlined"
              sx={{
                borderColor: 'black',
                backgroundColor: 'black',
                color: 'white',
                px: 3,
                "&:hover": {
                  color: 'black',
                  backgroundColor: 'white',
                  borderColor: 'black',
                },
                textTransform: 'none',
              }}
              onClick={saveProfile}
            >
              Save
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
