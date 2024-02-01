import React, { useState } from 'react';
import { Avatar, Box, Button, IconButton, Link, Menu, MenuItem, Typography } from "@mui/material";
import { styles } from "../../styles/styles";
// import Speaker from "../assets/Speaker.png";
import Arrow from "../../assets/Arrow.png";
// import MaleUser from "../assets/Male User.png";
import logo from "../../assets/Slide1.png";
// import DownloadWhite from "../assets/DownloadWhite.png";
import { useLocation, useNavigate } from "react-router-dom";
// import jsonRoutes from "../constants/routes.json"
import { useDispatch } from "react-redux";
// import { userLogout } from "../features/auth/authActions";

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: "black",
        },
        children: `${name.split(' ')[0][0]}`,
    };
}

function Header({ screenName }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const user = localStorage.getItem('usersInfo')
    const users = JSON.parse(user)
    const location = useLocation();

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        handleMenuClose();
        navigate("/dashboard/profile")
    };

    const handleLogoutClick = async () => {
        // await dispatch(userLogout());
        navigate('/login')
        localStorage.removeItem("usersInfo");
        localStorage.removeItem("userToken");
        window.location.reload()

    };
    const handlenavigateToMap = () => {
        navigate('/directions')
        window.location.reload()
    }
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        "@media(min-width: 600px)": {
                            display: "none",
                        },
                    }}
                >
                    <Link to="/dashboard">
                        <img
                            src={logo}
                            style={{
                                width: "5rem",
                            }}
                        />
                    </Link>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: "30.09px",
                            "@media (max-width: 915px)": {
                                fontSize: "15px",
                            },
                        }}
                    >
                        {screenName}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        paddingTop: "10px",
                    }}
                >
                    <Box >
                        <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <Typography variant='body1' sx={{ color: 'blue', textDecoration: 'underline' }} onClick={handlenavigateToMap} mr={2} >
                                Visit live website
                            </Typography>

                            {users && (

                                <Typography variant='body1' mr={2}  >
                                    {users.firstName + " " + users.lastName}
                                </Typography>
                            )
                            }
                            <Avatar sx={{ cursor: 'pointer' }} {...stringAvatar(users ? users.firstName + " " + users.lastName : "")}
                                onClick={handleMenuClick}
                            />
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                {/* <MenuItem onClick={handleProfileClick}>Profile</MenuItem> */}
                                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </>
    );
}

export default Header;
