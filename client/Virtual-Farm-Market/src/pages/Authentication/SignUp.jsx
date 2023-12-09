import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Alert,
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
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { persistor } from "../../Redux/store";
import {
  CLEAR_MESSAGE_ERROR,
  GET_CITY_LIST,
  GET_PROVINCE_LIST,
  POST_SIGNUP_USER,
} from "../../Redux/Reducers/authReducer";
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
    .required("Password Required")
    .min(8, "Must be 8 characters or more")
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?&]+/, "One special character")
    .matches(/\d+/, "One number"),
  confirmPassword: Yup.string()
    .required("Confirm Password Required")
    .oneOf([Yup.ref("password"), null], "Must Match Both Password"),
  firstName: Yup.string()
    .matches(/^[^\d]+$/, "Firstname should not contain digits")
    .required("FirstName Required"),
  lastName: Yup.string()
    .matches(/^[^\d]+$/, "Lastname should not contain digits")
    .required("LastName Required"),
  phoneNumber: Yup.string()
    .required("Phone Required")
    .matches(/^\d{10}$/, "Phone number should contain only 10 digits."),
  address: Yup.string().required("Address Required"),
  city: Yup.string().required("City Required"),
  province: Yup.string().required("Province Required"),
  userType: Yup.string().required("Required"),
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
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = React.useState(false);

  React.useEffect(() => {
    persistor.purge();
    dispatch({ type: GET_CITY_LIST });
    dispatch({ type: GET_PROVINCE_LIST });
    dispatch({ type: CLEAR_MESSAGE_ERROR, payload: "message" });
  }, []);

  React.useEffect(() => {
    if (
      auth.message ===
      "User created successfully. Check your email for confirmation."
    ) {
      if (auth.isEmailConfirmed) {
        navigate("/user/login");
        dispatch({ type: CLEAR_MESSAGE_ERROR, payload: "message" });
      }
    }
  }, [auth.message]);

  React.useEffect(() => {
    if (auth.message === "Email confirmed successfully.") {
      if (auth.isEmailConfirmed) {
        navigate("/user/login");
        dispatch({ type: CLEAR_MESSAGE_ERROR, payload: "message" });
      }
    }
  }, []);

  const handleCheckboxChange = (event) => {
    setIsSubscribed(event.target.checked);
  };

  const handleEmailClick = () => {
    const emailAddress = "https://mail.google.com/mail/";
    window.open(emailAddress, "_blank");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        // maxWidth="md"

        component="main"
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 4,
            p: 3,

            boxShadow: "0px 0px 5px rgba(19, 3, 3, 0.809)",
          }}
        >
          <Box sx={{ mt: 4 }}>
            <img src={VFMLogoNoBG} style={{ height: 70, width: "auto" }} />
          </Box>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "space-between" }}
            spacing={3}
          >
            <Grid
              item
              xs={7}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              <Carousel />
            </Grid>
            <Grid item xs={5}>
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: 4,
                  p: 3,
                  boxShadow: "0px 0px 5px rgba(19, 3, 3, 0.809)",
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>

                <div className="mb-4">
                  {(auth.error || auth.message) && (
                    <>
                      <div className="m-4">
                        {auth.error && (
                          <Alert severity="error">{auth.error}</Alert>
                        )}
                      </div>
                      <div className="m-4">
                        {auth.message ===
                          `User created successfully. Check your email for confirmation.` && (
                          <Alert severity="success">
                            {auth.message} &nbsp;
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleEmailClick()}
                            >
                              Open Email
                            </button>
                          </Alert>
                        )}
                      </div>
                    </>
                  )}
                </div>
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
                    userType: "Customer",
                    isSubscribed: isSubscribed,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    console.log("SUBMIT");
                    const value = {
                      name: values.firstName,
                      email: values.email,
                      password: values.password,
                      phoneNumber: values.phoneNumber,
                      city: values.city,
                      province: values.province,
                      userType: values.userType,
                    };
                    dispatch({ type: POST_SIGNUP_USER, payload: value });
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
                          <InputLabel htmlFor="city">City</InputLabel>
                          <Field
                            as={Select}
                            fullWidth
                            labelId="demo-simple-select-helper-label"
                            id="city"
                            name="city"
                            label="City"
                            onChange={handleChange}
                          >
                            <MenuItem selected value="">
                              <em>None</em>
                            </MenuItem>
                            {auth?.cityList?.map((item, index) => (
                              <MenuItem value={item.name} key={index}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Field>

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
                            {auth.provinceList &&
                              auth.provinceList.map((item, index) => (
                                <MenuItem value={item.name} key={index}>
                                  {item.name}
                                </MenuItem>
                              ))}
                          </Field>
                          <ErrorMessage
                            name="province"
                            id="province"
                            component="div"
                            className="error text-danger"
                          />
                        </Grid>
                        <Grid className="mb-2" item xs={12}>
                          <InputLabel htmlFor="userType">User Type</InputLabel>
                          <Field
                            as={Select}
                            fullWidth
                            id="userType"
                            label="User Type"
                            name="userType"
                            autoComplete="userType"
                            value={values.userType}
                          >
                            <MenuItem value="Customer">Customer</MenuItem>
                            <MenuItem value="Farmer">Farmer</MenuItem>
                          </Field>
                          <ErrorMessage
                            name="userType"
                            id="userType"
                            component="div"
                            className="error text-danger"
                          />
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

                        <Grid className="mb-4 mt-3" item xs={12}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            xs={{ mt: 3, mb: 2 }}
                            disabled={auth.loading ? true : false}
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
                              `Sign Up`
                            )}
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    Already have an account? &nbsp;
                    <NavLink to="/user/login" variant="body2">
                      Sign in
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>{" "}
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
