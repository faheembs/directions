import React from "react";
import { Box, Button, Card, Grid, Link, TextField, Typography } from "@mui/material";
import { styles } from "../../utils/styles/styles";
import logo from '../../assets/Slide1.png';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import animation from '../../assets/animation2.mov'


const Signup = () => {


  const navigate = useNavigate()

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      console.log(values);
    },
  });

  return (
    <Box sx={styles.authContainer}>
      <video autoPlay muted loop style={{ position: 'absolute', width: '113%', height: '113%', objectFit: 'cover' }}>
        <source src={animation} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Card elevation={6} sx={{ zIndex: 1000 }}>
        <Box sx={{ width: "469.21px", mt: 2 }}>
          <Grid align="center" pb={2}>
            <Link href='/'> <img src={logo} height={120} width={320} style={{ objectFit: 'cover' }} alt="App Logo" /> </Link>
          </Grid>
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
            <Box px={4} my={4}>
              <Typography variant="p" component="p">
                Confirm Password
              </Typography>
              <TextField
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ width: "100%" }}
                required
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Box>
            <Box px={2}>
              <Box sx={styles.buttonAlignment}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: "45.69px",
                    py: 1, px: 8,
                    mb: 2,
                    textTransform: 'none'
                  }}
                  onClick={navigate('/directions')}
                >
                  Signup
                </Button>
              </Box>
              <Box sx={styles.navigateToSignup}>
                <Typography my={1} sx={{ display: 'flex', flexDirection: 'row' }}>
                  Already have an account?
                  <Typography sx={{ ml: 1 }}>
                    <Link href="/login" underline="hover">
                      Login
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

export default Signup;
