import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Alert, Container, IconButton, InputAdornment } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import {
  CLEAR_MESSAGE_ERROR,
  POST_SIGNIN_USER,
} from "../../Redux/Reducers/authReducer";
import { GET_ADMIN_LOGIN } from "../../Redux/Reducers/adminReducer";
import VFMLogoNoBG from "../../Assets/VFMIcon/VFM-Logo-NoBG.png";
import Carousel from "../../components/Carousel/Carousel";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .test("is-lowercase", "Email should be in lowercase", function (value) {
      if (value && value !== value.toLowerCase()) {
        return false;
      }
      return true;
    })
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      "Invalid email address."
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
    if (auth.error) {
      console.log(auth.error);
    }
  }, [auth.error]);

  React.useEffect(() => {
    if (adminReducer.adminId) {
      //Toast...
      navigate("/admin/dashboard");
    }
  }, [adminReducer.adminId]);

  const handleSubmit = () => {
    dispatch({ type: CLEAR_MESSAGE_ERROR, payload: "error" });
    navigate("/user/register");
  };

  React.useEffect(() => {
    if (
      auth.message ===
      `User created successfully. Check your email for confirmation.`
    ) {
      dispatch({ type: CLEAR_MESSAGE_ERROR, payload: "message" });
    }
  }, [auth.message]);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid
          container
          component="main"
          sx={{ height: "100vh", display: "flex", justifyContent: "center" }}
        >
          <CssBaseline />

          <Grid item>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 1200,

                borderRadius: 4,
                p: 3,
                boxShadow: "0px 0px 5px rgba(19, 3, 3, 0.809)",
              }}
            >
              <Box sx={{ mt: 4 }}>
                <img src={VFMLogoNoBG} style={{ height: 80, width: "auto" }} />
              </Box>
              <Grid container direction={"row"}>
                <Grid
                  item
                  xs={7}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Carousel />
                </Grid>
                <Grid item xs={5}>
                  <Container maxWidth="md">
                    <Box
                      sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",

                        borderRadius: 4,
                        p: 3,
                        boxShadow: "0px 0px 5px rgba(19, 3, 3, 0.809)",
                      }}
                    >
                      <Typography component="h1" variant="h5">
                        {currentPath === `/admin/login`
                          ? `Admin Sign in`
                          : `Sign in`}
                      </Typography>

                      <div className="mb-4">
                        {(auth.error || adminReducer.error) && (
                          <>
                            <div className="m-4">
                              {auth.error ? (
                                <Alert severity="error">{auth.error}</Alert>
                              ) : adminReducer.error ? (
                                <Alert severity="error">
                                  {adminReducer.error}
                                </Alert>
                              ) : null}
                            </div>
                          </>
                        )}
                      </div>
                      <Formik
                        initialValues={{
                          email: "",
                          password: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          console.log(values);
                          const value = {
                            email: values.email,
                            password: values.password,
                          };
                          if (currentPath === `/admin/login`) {
                            dispatch({ type: GET_ADMIN_LOGIN, payload: value });
                          } else {
                            dispatch({
                              type: POST_SIGNIN_USER,
                              payload: value,
                            });
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
                      {currentPath === `/admin/login` ? null : (
                        <Grid container>
                          <Grid item xs>
                            <NavLink to="/user/forgetpassword" variant="body2">
                              Forgot password?
                            </NavLink>
                          </Grid>
                          <Grid item>
                            Don't have an account? &nbsp;
                            <Button onClick={() => handleSubmit()}>
                              Sign Up
                            </Button>
                            {/* <NavLink to="/register" >{"Sign Up"}</NavLink> */}
                          </Grid>
                        </Grid>
                      )}
                    </Box>
                  </Container>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
