import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AdminSideBar from "./AdminSideBar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import DataTable from "../../components/DataTables/DataTable";
import Profile from "./profile/Profile";

const drawerWidth = 300;
const fakeData = [
    {
        mainLabel: 'Κατάσταση',
    },
    {
        mainLabel: 'Κατηγορία',
    },
];

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();
    const mainRoute = location.pathname === '/dashboard/datasets';
    const dataRoute = location.pathname === '/dashboard/datasets'
    const profileRoute = location.pathname === '/dashboard/profile'





    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                elevation={0}
                position="fixed"
                color="inherit"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    "@media (max-width: 599px)": {
                        height: "200px",
                    },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Header screenName={'Dashboard'} />
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    <AdminSideBar />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    <AdminSideBar />
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    px: 3,
                    mt: 19,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    height: '100vh',
                    "@media (max-width: 599px)": {
                        padding: "7.5rem 0px 0px 0px",
                    },
                    // overflowX: 'hidden'
                }}
            >
                <Box>
                    {mainRoute ? <DataTable /> : profileRoute ? <Profile /> : <DataTable />}
                </Box>
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    window: PropTypes.func,
};

export default Dashboard;
