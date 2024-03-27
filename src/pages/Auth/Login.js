import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Card, Grid, Link, TextField, Typography } from "@mui/material";
import { styles } from "../../utils/styles/styles";
import logo from '../../assets/Slide1.png';
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useLocation, useNavigate } from "react-router-dom";
import animation from '../../assets/animation2.mov'
import { useDispatch } from "react-redux";
import { userLogin } from "../../features/Authentication/AuthActions";
import { toast } from "react-toastify";
import { browserHistory } from 'react-router';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate();
  const dispatch = useDispatch()
  // const location = useLocation()

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  // useEffect(() => {
  //   const userToken = localStorage.getItem('userToken');
  //   if (userToken && location.pathname === '/login') {
  //     console.log(location.pathname)
  //     navigate(-1)
  //     window.relaod()
  //   } else {
  //     console.log("no token", location.pathname)

  //   }
  // }, [])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;

      const response = await dispatch(userLogin({ email: email, password: password }))
      if (response.payload !== 'Incorrect password') {
        toast.success("Login succesfully")
        browserHistory.push("/directions")
        window.location.reload();
        // navigate('/dashboard');
        // navigate('/directions');
        setTimeout(() => {
          browserHistory.push("/directions")
        }, 1000)
        window.location.reload();
      } else {
        toast.error(response.payload)
      }



    },
  });
  return (
    <Box sx={styles.authContainer}>
      <video autoPlay muted loop style={{ position: 'absolute', width: '100%', height: '112.6%', objectFit: 'cover' }}>
        <source src={animation} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Card elevation={6} sx={{ zIndex: 1000 }}>
        <Box sx={{ width: "469.21px", mt: 2 }}>
          <Grid align="center" pb={2}>
            <Link href='/'> <img src={logo} height={120} width={320} style={{ objectFit: 'cover' }} alt="App Logo" /> </Link>
          </Grid>
          {errorMessage && (
            <Alert sx={{ mx: 4 }} severity="error" >{errorMessage}</Alert>
          )}
          <form onSubmit={formik.handleSubmit}>
            <Box px={4} my={4}>
              <Typography variant="p" component="p">
                Email
              </Typography>
              <TextField
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ width: "100%" }}
                required
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
            <Box px={4} my={4}>
              <Typography variant="p" component="p">
                Password
              </Typography>
              <TextField
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ width: "100%" }}
                required
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>
            <Box px={2}>
              <Box sx={styles.buttonAlignment}>

                <Button
                  type="submit"
                  variant="outlined"
                  size="large"
                  sx={{
                    // borderRadius: "45.69px",
                    mb: 2,
                    px: 2,
                    textTransform: 'none',
                    borderColor: 'black', backgroundColor: 'black', color: 'white', "&:hover": {
                      color: 'black',
                      backgroundColor: 'white',
                      borderColor: 'black'
                    },
                  }}
                  onClick={formik.handleSubmit}
                >
                  Login
                </Button>

                <Link href="#" underline="hover">Forgot your password?</Link>
              </Box>
              <Box sx={styles.navigateToSignup}>
                <Typography my={1} sx={{ display: 'flex', flexDirection: 'row' }}>
                  Don't have an account?
                  <Typography sx={{ ml: 1 }}>
                    <Link href="/register" underline="hover">
                      Signup
                    </Link>
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
