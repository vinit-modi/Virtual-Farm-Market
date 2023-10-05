import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Invalid email address"
    ),
  password: Yup.string()
    .required("Password Required")
    .min(8, "Must be 8 characters or more")
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?&]+/, "One special character")
    .matches(/\d+/, "One number"),
  confirmPassword: Yup.string()
    .required("Confirm Password Required")
    .oneOf([Yup.ref("password"), null], "Must Match Both Password"),
  firstName: Yup.string().required("FirstName Required"),
  lastName: Yup.string().required("LastName Required"),
  phoneNumber: Yup.string().required("Phone Required"),
  address: Yup.string().required("Address Required"),
  city: Yup.string().required("City Required"),
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Virtual Farm Market &nbsp;
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = React.useState(false);
  const [province, setProvince] = useState([
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
  ]);

  const handleCheckboxChange = (event) => {
    setIsSubscribed(event.target.checked);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#c6ff00" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              phoneNumber: "",
              address: "",
              email: "",
              password: "",
              confirmPassword: "",
              city: "",
              province: "",
              isSubscribed: isSubscribed,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("COMING...", values);
            }}
          >
            {({ isSubmitting, values, handleChange }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid className="mb-2" item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      autoComplete="given-name"
                      name="firstName"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                    <ErrorMessage
                      name="firstName"
                      id="firstName"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>
                  <Grid className="mb-2" item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                    <ErrorMessage
                      name="lastName"
                      id="lastName"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>
                </Grid>

                <Grid>
                  <Grid className="mb-2" xs={12} item>
                    <Field
                      as={TextField}
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      autoComplete="phoneNumber"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      id="phoneNumber"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>
                  <Grid className="mb-2" item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="address"
                      label="Home Address"
                      name="address"
                      autoComplete="address"
                    />
                    <ErrorMessage
                      name="address"
                      id="address"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>

                  <Grid className="mb-2" item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="city"
                      label="City"
                      name="city"
                      autoComplete="city"
                    />
                    <ErrorMessage
                      name="city"
                      id="city"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>
                  <Grid className="mb-2" item xs={12}>
                    <InputLabel htmlFor="province">Province</InputLabel>
                    <Field
                      as={Select}
                      fullWidth
                      labelId="demo-simple-select-helper-label"
                      id="province"
                      name="province"
                      label="Province"
                      onChange={handleChange}
                    >
                      <MenuItem selected value="">
                        <em>None</em>
                      </MenuItem>
                      {province.map((item, index) => (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid className="mb-2" item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                    <ErrorMessage
                      name="email"
                      id="email"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>
                  <Grid className="mb-2" item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="password"
                      label="Password"
                      type={!isVisible ? `password` : `text`}
                      id="password"
                      autoComplete="new-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setIsVisible(!isVisible)}
                              aria-label="password visibility"
                              edge="end"
                            >
                              {isVisible ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ErrorMessage
                      name="password"
                      id="password"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>
                  <Grid className="mb-1" item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type={!isVisibleConfirm ? `password` : `text`}
                      id="confirmPassword"
                      autoComplete="new-confirmPassword"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setIsVisibleConfirm(!isVisibleConfirm)
                              }
                              aria-label="password visibility"
                              edge="end"
                            >
                              {isVisibleConfirm ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      id="confirmPassword"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>

                  <Grid item xs={12} className="mb-3 ms-2">
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          value="allowExtraEmails"
                          color="primary"
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="I want recieve emails."
                    />
                  </Grid>

                  <Grid className="mb-4" item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      xs={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          <Grid container justifyContent="flex-end">
            <Grid item>
              Already have an account? &nbsp;
              <NavLink to="/login" variant="body2">
                Sign in
              </NavLink>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
