import React from 'react';
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
// import { userLogout } from "../features/auth/authActions";
import { useDispatch } from "react-redux";
import { io } from 'socket.io-client';


function SidebarTabs({ text, icon, navigates, iconSvg }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Define a function to check if the current route matches the given route
  const isRouteActive = (route) => {
    return location.pathname === route;
  };
  const user = localStorage.getItem('usersInfo')
  const users = JSON.parse(user)

  const handleDisconnect = () => {
    const socket = io('http://localhost:8000');
    socket.emit('disconnectRequest', users._id);
    socket.disconnect();
  };
  // Handle navigation on tab click
  const handlenavigate = async () => {
    if (navigates == "/login") {
     navigate('/login')
        localStorage.removeItem("usersInfo");
        localStorage.removeItem("userToken");
        window.location.reload()

    } else {
      navigate(navigates);
    }
  };

  return (
    <>
      <ListItem sx={{
        color: "#52585D", backgroundColor: isRouteActive(navigates) ? "#DFE7EE" : "transparent", borderRadius: 4, mt: 1, width: '122%'
      }} key={text} disablePadding >
        <ListItemButton sx={{ borderRadius: 4, }}>
          <ListItemIcon>
            {iconSvg ? iconSvg :
              <img src={icon} height={25} width={25} />
            }
          </ListItemIcon>

          <ListItemText
            primary={text}
            sx={{ paddingY: "5px", whiteSpace: "nowrap", color: '#747B81' }}
            onClick={handlenavigate}
          />


        </ListItemButton>
      </ListItem>
    </>
  );
}

export default SidebarTabs;
