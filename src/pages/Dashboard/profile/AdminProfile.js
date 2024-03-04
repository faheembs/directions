import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AppBarComponent from "../../components/AppBarComponent";
import Profile from "./Profile";
import { Typography } from "@mui/material";
import AdminSideBar from "../AdminSideBar";
import { useNavigate } from "react-router-dom";

const drawerWidth = 300;


function AdminProfile(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

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
                    // height: 100,
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

                    <AppBarComponent />
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
                    mt: 7,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    "@media (max-width: 599px)": {
                        padding: "7.5rem 0px 0px 0px",
                    },
                    overflowY: 'hidden'
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: "40.09px",
                        "@media (max-width: 915px)": {
                            fontSize: "15px",
                        },
                        my: 2,
                        "@media (max-width: 391px)": {
                            mt: "14px",
                            mx: 4
                        },
                    }}
                >
                    Πληροφορίες Χρήστη
                </Typography>
                <Profile />
            </Box>
        </Box>
    );
}

AdminProfile.propTypes = {
    window: PropTypes.func,
};

export default AdminProfile;
