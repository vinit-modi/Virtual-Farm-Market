import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Alert, IconButton, InputAdornment } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { toast } from "react-toastify";
import { persistor } from "../../Redux/store";
import {
  CLEAR_MESSAGE_ERROR,
  POST_SIGNIN_USER,
} from "../../Redux/Reducers/authReducer";
import { GET_ADMIN_LOGIN } from "../../Redux/Reducers/adminReducer";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Invalid email address"
    ),
  password: Yup.string()
    .required("Required")
    .min(8, "Must be 8 characters or more")
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?&]+/, "One special character")
    .matches(/\d+/, "One number"),
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

export default function SignInSide() {
  const [isVisible, setIsVisible] = React.useState(false);

  const auth = useSelector((state) => state.auth);
  const adminReducer = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  React.useEffect(() => {
    persistor.purge();
  }, []);

  React.useEffect(() => {
    if (auth.error) {
      console.log(auth.error);
    }
  }, [auth.error]);

  React.useEffect(() => {
    if (auth.message) {
      //Toast...
      navigate("/dashboard");
    }
  }, [auth.message]);

  React.useEffect(() => {
    if (adminReducer.adminId) {
      //Toast...
      navigate("/admin/dashboard");
    }
  }, [adminReducer.adminId]);

  const handleSubmit = () => {
    dispatch({ type: CLEAR_MESSAGE_ERROR, payload: "error" });
    navigate("/register");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <div className="m-4">
              {auth.error && <Alert severity="error">{auth.error}</Alert>}
            </div>
            <div className="m-4">
              {adminReducer.error && <Alert severity="error">{adminReducer.error}</Alert>}
            </div>

            <Formik
              initialValues={{
                email: "",
                password: "",
                rememberMe: false,
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                const value = {
                  email: values.email,
                  password: values.password,
                };
                if (currentPath === `/admin/login`) {
                  dispatch({type:GET_ADMIN_LOGIN,payload:value})
                } else {
                  dispatch({ type: POST_SIGNIN_USER, payload: value });
                }
              }}
            >
              {({ isSubmitting, values, handleChange }) => (
                <Form>
                  <Field
                    as={TextField}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <ErrorMessage
                    name="email"
                    id="email"
                    component="div"
                    className="error text-danger"
                  />
                  <Field
                    as={TextField}
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type={!isVisible ? `password` : `text`}
                    id="password"
                    autoComplete="current-password"
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

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        name="rememberMe"
                        id="rememberMe"
                        color="primary"
                      />
                    }
                    label="Remember Me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={auth?.loading ? true : false}
                  >
                    {auth.loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Loading...
                      </>
                    ) : (
                      `Sign In`
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
            <Grid container>
              <Grid item xs>
                <NavLink to="/forgetpassword" variant="body2">
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                Don't have an account? &nbsp;
                <Button onClick={() => handleSubmit()}>Sign Up</Button>
                {/* <NavLink to="/register" >{"Sign Up"}</NavLink> */}
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
