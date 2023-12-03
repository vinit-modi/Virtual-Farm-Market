import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Typography,
  Box,
  TextField,
  Button,
  Container,
  Grid,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { useEffect } from "react";
import {
  GET_CITY_LIST,
  GET_PROVINCE_LIST,
} from "../../Redux/Reducers/authReducer";
import { useNavigate } from "react-router-dom";

import {
  CLEAR_MESSAGE_ADDRESS,
  GET_ADD_NEW_ADDRESS,
  GET_EDIT_ADDRESS,
} from "../../Redux/Reducers/addressReducer";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import { green } from "@mui/material/colors";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .typeError("Full name must be a string")
    .test("not-number", "Full name cannot be a number", (value) => isNaN(value))
    .required("Full name must be required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  streetNumber: Yup.string().required("Street Number is required"),
  homeAddress: Yup.string().required("Street Name is required"),
  city: Yup.string().required("City is required"),
  province: Yup.string().required("Province is required"),
  postalCode: Yup.string()
    .matches(/^([A-Z]\d[A-Z] ?\d[A-Z]\d)$/, "Invalid Postal Code format")
    .required("Postal code is required"),
});

function UserAddressForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const address = useSelector((state) => state.address);
  const { addressObj } = address;

  useEffect(() => {
    dispatch({ type: GET_CITY_LIST });
    dispatch({ type: GET_PROVINCE_LIST });
  }, []);

  useEffect(() => {}, [navigate, dispatch]);

  useEffect(() => {
    if (address.message) {
      toast.success(address.message);
      dispatch({ type: CLEAR_MESSAGE_ADDRESS });
      navigate("/user/defaultcreds");
    }
  }, [address.message]);

  const handleSubmit = (values) => {
    if (Object.entries(address.addressObj).length === 0) {
      const finalValues = {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        address: values.streetNumber,
        address2: values.homeAddress,
        province: values.province,
        city: values.city,
        postalCode: values.postalCode,
        // defaultAddress: values.defaultAddress, //No Validation
        // accessCode: values.accessCode, //No Validation //Can be null
      };
      console.log(finalValues);
      dispatch({ type: GET_ADD_NEW_ADDRESS, payload: finalValues });
    } else {
      const finalValues = {
        _id: addressObj._id,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        address: values.streetNumber,
        address2: values.homeAddress,
        province: values.province,
        city: values.city,
        postalCode: values.postalCode,
        // defaultAddress: values.defaultAddress, //No Validation
        // accessCode: values.accessCode, //No Validation //Can be null
      };
      console.log(finalValues);
      dispatch({ type: GET_EDIT_ADDRESS, payload: finalValues });
    }
  };

  const handleCancle = () => {
    navigate("/user/defaultcreds");
  };

  return (
    <>
      <Container maxWidth="md">
        <Grid container direction="row">
          <Grid item>
            {address.loading ? null : (
              <Container maxWidth="md" sx={{ mt: 4 }}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h4" sx={{ mb: 2 }}>
                    {Object.entries(addressObj).length === 0
                      ? `Add Address`
                      : `Edit Address`}
                  </Typography>

                  {address.error && (
                    <Alert severity="error">{address.error}</Alert>
                  )}

                  <Formik
                    initialValues={
                      Object.entries(address.addressObj).length === 0
                        ? {
                            fullName: "",
                            phoneNumber: "",
                            streetNumber: "",
                            homeAddress: "",
                            province: "",
                            city: "",
                            postalCode: "",
                            // defaultAddress: false, //No Validation
                            // accessCode: "", //No Validation //Can be null
                          }
                        : {
                            fullName: addressObj.fullName,
                            phoneNumber: addressObj.phoneNumber,
                            streetNumber: addressObj.address,
                            homeAddress: addressObj.address2,
                            province: addressObj.province,
                            city: addressObj.city,
                            postalCode: addressObj.postalCode,
                          }
                    }
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {(formik) => (
                      <Form autoComplete="off">
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={8}>
                                <Typography variant="h5" sx={{ ml: 1, mt: 2 }}>
                                  Full Name:
                                </Typography>
                                <Field
                                  as={TextField}
                                  fullWidth
                                  id="fullName"
                                  name="fullName"
                                  autoComplete="fullName"
                                />
                                <ErrorMessage
                                  name="fullName"
                                  id="fullName"
                                  component="div"
                                  className="error text-danger"
                                />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography
                                  variant="h5"
                                  sx={{ mt: { xs: 3, sm: 2 } }}
                                >
                                  Phone Number:
                                </Typography>
                                <Field
                                  as={TextField}
                                  fullWidth
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  autoComplete="phoneNumber"
                                  placeholder="1234567890"
                                />
                                <ErrorMessage
                                  name="phoneNumber"
                                  id="phoneNumber"
                                  component="div"
                                  className="error text-danger"
                                />
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12}>
                            <Typography variant="h5" sx={{ ml: 1, mt: 2 }}>
                              Address:
                            </Typography>
                            <Field
                              as={TextField}
                              fullWidth
                              id="streetNumber"
                              name="streetNumber"
                              autoComplete="streetNumber"
                              placeholder="Street Number"
                            />
                            {formik.touched.streetNumber &&
                              Boolean(formik.errors.streetNumber) && (
                                <Box sx={{ mb: 2 }}>
                                  <ErrorMessage
                                    name="streetNumber"
                                    id="streetNumber"
                                    component="div"
                                    className="error text-danger"
                                  />
                                </Box>
                              )}
                            <Field
                              as={TextField}
                              fullWidth
                              id="homeAddress"
                              name="homeAddress"
                              autoComplete="homeAddress"
                              placeholder="Apt, Suite, Unit, Building"
                            />
                            <ErrorMessage
                              name="homeAddress"
                              id="homeAddress"
                              component="div"
                              className="error text-danger"
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Typography variant="h5" sx={{ ml: 1, mt: 2 }}>
                              City:
                            </Typography>

                            <Field
                              as={Select}
                              fullWidth
                              id="city"
                              name="city"
                              autoComplete="city"
                            >
                              {auth.cityList &&
                                auth.cityList.map((item, index) => (
                                  <MenuItem value={item.name} key={item._id}>
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

                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={8}>
                                <Typography variant="h5" sx={{ ml: 1, mt: 2 }}>
                                  Province/Territory:
                                </Typography>
                                <Field
                                  as={Select}
                                  fullWidth
                                  id="province"
                                  name="province"
                                  autoComplete="province"
                                >
                                  {auth.provinceList &&
                                    auth.provinceList.map((item, index) => (
                                      <MenuItem
                                        value={item.name}
                                        key={item._id}
                                      >
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
                              <Grid item xs={12} sm={4}>
                                <Typography
                                  variant="h5"
                                  sx={{ mt: { xs: 3, sm: 2 } }}
                                >
                                  Postal Code:
                                </Typography>
                                <Field
                                  as={TextField}
                                  fullWidth
                                  id="postalCode"
                                  name="postalCode"
                                  autoComplete="postalCode"
                                  placeholder="V2V 2V2 or V2V2V2"
                                />
                                <ErrorMessage
                                  name="postalCode"
                                  id="postalCode"
                                  component="div"
                                  className="error text-danger"
                                />
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            // sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Button
                              variant="contained"
                              onClick={() => handleCancle()}
                              sx={{ mx: 2 }}
                            >
                              Cancle
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                bgcolor: green["A700"],
                                "&:hover": { bgcolor: green["A400"] },
                              }}
                              type="submit"
                              startIcon={
                                Object.entries(address.addressObj).length ===
                                0 ? (
                                  <AddCircle />
                                ) : (
                                  <EditIcon />
                                )
                              }
                            >
                              {Object.entries(address.addressObj).length === 0
                                ? `Add Address`
                                : `Edit Address`}
                            </Button>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Container>
            )}
          </Grid>
        </Grid>{" "}
      </Container>
    </>
  );
}

export default UserAddressForm;
