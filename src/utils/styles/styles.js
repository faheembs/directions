export const styles = {
    container: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // zIndex: 1,
    },
    authContainer: {
      marginTop:10,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // marginLeft: 18,
      overFlowX: 'hidden',
    },
  
    buttonAlignment: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: 'column',
    },
    navigateToSignup:{

      display: "flex",
      flexDirection:"row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 4
    },
    welcomeFont: {
      fontWeight: 400,
      // lineHeight: "25px",
      letterSpacing: "0.005em",
    },
  
    centerDiv: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      marginLeft: '10px'
  
    },
    stackDiv: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginLeft: '10px'
  
    },
    centerDivLogo: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
  
    },
    centeredDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  
  export const sideBarStyles = {
    typograpy: {
      Weight: 600,
      fontSize: "20px",
      color: "#666B70",
      // paddingY: "1rem",
    },
  };
  
  // Big Text in Form
  export const textSetter = {
    bigText: {
      position: "absolute",
      marginLeft: "10rem",
      "@media (min-width: 1800px)": {
        marginLeft: "20rem",
      },
      top: "50px",
      opacity: "50%",
      fontWeight: "300",
      fontSize: "35px",
      color: "#000000",
      "@media (max-width: 800px)": {
        fontSize: "15px",
      },
    },
  
    lastText: {
      fontSize: "50px",
    },
  };
  
  export const customTableHeader = {
    background: {
      backgroundColor: "#ccc",
    }
  }
  
  export const defaultModalStyles = {
    content: {
      display: "flex",
      justifyContent: "center",
      top: "52%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "500px",
      minHeight: "600px",
    },
  }
  
  export const CustomModalOverlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  
  }