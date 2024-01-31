import React from 'react'
import SidebarTabs from "./SidebarTabs";
import { Box, Divider, Drawer, List, Typography } from "@mui/material";
import { sideBarStyles, styles } from "../../styles/styles";
import logo from "../../assets/Slide1.png";
import Customer from "../../assets/Customer.png";
import Power from "../../assets/power.png";
import Categories from "../../assets/Categories.png";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
const drawerWidth = 310;

const AdminSideBar = () => {

    return (
        <>
            <Drawer
                sx={{
                    width: drawerWidth,
                    height: "1263px",
                    border: "0.5px",
                    color: "#C7C7C7",
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        // boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.2)',
                    },

                }}
                variant="permanent"
                anchor="left"
            >
                <Box sx={styles.centerDivLogo} >
                    <Link to="/">
                        <img
                            src={logo}
                            style={{
                                width: "220px",
                                height: "100px",
                                objectFit: 'contain'
                            }}
                        />
                    </Link>
                </Box>
                <Divider />
                <Box sx={styles.centerDiv}>
                    <Box sx={{ width: "80% !important" }}>
                        <List>
                            <SidebarTabs
                                text="Dataset Management"
                                icon={Categories}
                                navigates="/dashboard/datasets"
                            />
                            <SidebarTabs
                                text="Users"
                                iconSvg={<GroupIcon height={25} width={25} />}
                                navigates="/dashboard/users"
                            />
                            <SidebarTabs
                                text="Profile"
                                iconSvg={<PersonIcon height={25} width={25} />}
                                navigates="/dashboard/profile"
                            />

                        </List>
                    </Box>
                </Box>

                <Divider />
                <Box sx={styles.centerDiv}>
                    <Box sx={{ width: "80% !important" }}>
                        <List>
                            <SidebarTabs
                                text="Logout"
                                icon={Power}
                                navigates='/logout'
                            />
                        </List>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

export default AdminSideBar;
