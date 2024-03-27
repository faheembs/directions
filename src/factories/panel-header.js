import React from "react"
import { PanelHeaderFactory, Icons, LogoComponent } from '@kepler.gl/components'; // Import LogoComponent
import { BUG_REPORT_LINK, USER_GUIDE_DOC } from '@kepler.gl/constants';
import logo from "../assets/Slide1-removebg.png"
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { browserHistory } from 'react-router';

export function CustomPanelHeaderFactory(...deps) {
  const PanelHeader = PanelHeaderFactory(...deps);

  const defaultActionItems = PanelHeader.defaultProps.actionItems;

  const CustomHeader = () => {

    const navigate = useNavigate()
    const handleNaviagteToDashboard = () => {
      // navigate('/dashboard')
      // window.location.reload()
      browserHistory.push('/dashboard')
    }
    return (
      <Box sx={{ mt: '-38px', width: '95%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={logo} style={{ objectFit: 'contain', width: '166px', height: '110px' }} />
        <Box sx={{ ml: "107px" }}>
          <Button variant='outlined'
            onClick={handleNaviagteToDashboard}
            sx={{
              textTransform: 'none', borderColor: 'black', backgroundColor: 'black', color: 'white', "&:hover": {
                color: 'black',
                backgroundColor: 'white',
                borderColor: 'black',
                borderRadius: 0,
              },
              borderRadius: 0,
              ml: '2px',
              // mb: 2
            }}>Go to Dashboard</Button>
        </Box>
      </Box>
    );
  }
  PanelHeader.defaultProps = {
    // ...PanelHeader.defaultProps,
    logoComponent: CustomHeader,
    // actionItems: [
    //   // {
    //   //   id: 'bug',
    //   //   iconComponent: Icons.Bug,
    //   //   href: BUG_REPORT_LINK,
    //   //   blank: true,
    //   //   tooltip: 'Bug Report',
    //   //   onClick: () => { }
    //   // },
    //   // {
    //   //   id: 'docs',
    //   //   iconComponent: Icons.Docs,
    //   //   href: USER_GUIDE_DOC,
    //   //   blank: true,
    //   //   tooltip: 'User Guide',
    //   //   onClick: () => { }
    //   // },
    //   defaultActionItems.find(item => item.id === 'storage'),
    //   {
    //     ...defaultActionItems.find(item => item.id === 'save'),
    //     label: null,
    //     tooltip: 'Share'
    //   }
    // ],


  };


  return PanelHeader;
}

CustomPanelHeaderFactory.deps = PanelHeaderFactory.deps;

export function replacePanelHeader() {
  return [PanelHeaderFactory, CustomPanelHeaderFactory];
}
