import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AdminSideBar from "./AdminSideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import DataTable from "../../components/DataTables/DataTable";
import Profile from "./profile/Profile";
import { io } from 'socket.io-client';
import { getAllUsers } from "../../features/Users/usersAction";
import { socketBaseURL } from "../../constants/baseURL";


const drawerWidth = 300;


function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [onlineStatus, setOnlineStatus] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const mainRoute = location.pathname === '/dashboard/datasets' || location.pathname === '/dashboard';
    const userRoute = location.pathname === '/dashboard/users'
    const profileRoute = location.pathname === '/dashboard/profile'



    useEffect(() => {



        // console.log("yes")
        const user = localStorage.getItem('usersInfo')

        const users = JSON.parse(user)
        const socket = io(socketBaseURL);
        socket.on("message", (message) => {
            console.log("Received message from server:", message);
            // console.log("userId from table", params)
            // socket.on("userOnlineStatus", ({ userId, online }) => {
            //   // const statusMessage = online ? "Online" : "Offline";
            //   console.log(`User ${userId} is ${statusMessage}`)
            // });

        });
        socket.on('userOnlineStatus', (userId, online) => {
            setOnlineStatus(online);
            if (users?.role === "admin") { dispatch(getAllUsers({})) }
            console.log("online status changed")

        })
        socket.emit("login", users?._id);
        dispatch(getAllUsers({}));
        const handleDisconnect = () => {
            socket.emit('disconnectRequest', users?._id);
            socket.disconnect();
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', handleDisconnect);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('beforeunload', handleDisconnect);
            }
        };

    }, [onlineStatus])


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
                    <Header screenName={mainRoute ? 'Datasets' : userRoute ? 'Users' : profileRoute ? 'Profile' : "Dashboard"} />
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
                    // height: '100vh',
                    "@media (max-width: 599px)": {
                        padding: "7.5rem 0px 0px 0px",
                    },
                    // overflowX: 'hidden'
                }}
            >
                <Box>
                    {mainRoute ? <DataTable /> : profileRoute ? <Profile /> : userRoute ? <DataTable /> : ''}
                </Box>
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    window: PropTypes.func,
};

export default Dashboard;
