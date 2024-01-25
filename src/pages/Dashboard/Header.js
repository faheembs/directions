import React, { useState } from 'react';
import { Box, Button, Link, Menu, MenuItem, Typography } from "@mui/material";
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
        navigate("/adminlayout/profile")
    };

    const handleLogoutClick = async () => {
        // await dispatch(userLogout());
        navigate('/login')
    };
    return (
        <>
            <Box
                sx={{
                    width: "100%",
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
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "10px",
                    }}
                >
                    <Box sx={styles.centerDiv}>
                        <Box
                            sx={{
                                "@media (max-width: 915px)": {
                                    display: "none",
                                },
                            }}
                        >
                            <img
                                src={Arrow}
                                style={{ width: "12px", padding: "0px 15px 0px 5px" }}
                            />
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: "15px",
                                    "@media(max-width: 915px)": {
                                        fontSize: "10px",
                                    },
                                }}
                            >
                                Dashboard
                            </Typography>
                        </Box>
                    </Box>
                    <Box >
                        <Box>

                            <Button
                                onClick={handleMenuClick}
                                variant="text"
                                sx={{
                                    textTransform: "none",
                                    color: "#0380FF",
                                    fontWeight: 400,
                                    borderRadius: 3,
                                    "@media (max-width: 915px)": {
                                        display: "none",
                                    },
                                }}
                            >
                                <Box sx={{ pr: 1, mt: 1 }} >
                                    <AccountCircleIcon />
                                </Box>
                                {(users !== null) ? users.userFormData.name : "User"}
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
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
            </Box>
        </>
    );
}

export default Header;
