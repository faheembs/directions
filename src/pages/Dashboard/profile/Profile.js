import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import InputProfile from './InputProfile'; // Adjust the import path based on your project structure

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phoneNumber: '',
  });

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const saveProfile = () => {
    // Implement your logic to save the profile data
    console.log('Profile saved:', profileData);
  };

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <InputProfile
            label="First Name"
            placeholder="Enter first name"
            value={profileData.firstName}
            onChangeFeild={(e) => handleInputChange(e, 'firstName')}
          />
        </Grid>
        <Grid item xs={6}>
          <InputProfile
            label="Last Name"
            placeholder="Enter last name"
            value={profileData.lastName}
            onChangeFeild={(e) => handleInputChange(e, 'lastName')}
          />
        </Grid>
        <Grid item xs={6}>
          <InputProfile
            label="Email"
            placeholder="Enter email"
            value={profileData.email}
            onChangeFeild={(e) => handleInputChange(e, 'email')}
          />
        </Grid>
        <Grid item xs={6}>
          <InputProfile
            label="Gender"
            placeholder="Enter gender"
            value={profileData.gender}
            onChangeFeild={(e) => handleInputChange(e, 'gender')}
          />
        </Grid>
        <Grid item xs={6}>
          <InputProfile
            label="Phone Number"
            placeholder="Enter phone number"
            value={profileData.phoneNumber}
            onChangeFeild={(e) => handleInputChange(e, 'phoneNumber')}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button variant="outlined" sx={{
            borderColor: 'black', backgroundColor: 'black', color: 'white', px: 3, "&:hover": {
              color: 'black',
              backgroundColor: 'white',
              borderColor: 'black'
            },
            textTransform: 'none'
          }} onClick={saveProfile}>
            Edit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
