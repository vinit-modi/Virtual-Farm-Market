import {
  Avatar,
  Button,
  Grid,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import {
  Alert,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  GET_CITY_LIST,
  GET_PROVINCE_LIST,
} from "../../Redux/Reducers/authReducer";
import EditIcon from "@mui/icons-material/Edit";
import { GET_USER } from "../../Redux/Reducers/userReducer";

const validationSchema = {};

function UpdateUserProfile() {
  //   const navigate = Navigate();
  const auth = useSelector((state) => state.auth);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  const param_id = "651e94a6fb0b84e048c1b1b7";

  const [provinceList, setProvinceList] = useState();
  const [cityList, setCityList] = useState();

  useEffect(() => {
    dispatch({ type: GET_PROVINCE_LIST });
    dispatch({ type: GET_CITY_LIST });
    const _id = {
      _id: param_id,
    };
    dispatch({ type: GET_USER, payload: _id });
  }, []);

  useEffect(() => {
    if (auth.cityList || auth.provinceList) {
      setProvinceList(auth.provinceList);
      setCityList(auth.cityList);
    }
  }, [auth.cityList || auth.provinceList]);

  return (
    <div>
      <Grid
        spacing={2}
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#c6ff00" }}>
            <EditIcon sx={{ color: "blue" }} />
          </Avatar>

          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <div className="m-4">
            {userDetails.error === `Request failed with status code 500` ? (
              <Alert severity="error">
                Selected User does not exist or Network issue
              </Alert>
            ) : (
              userDetails.error && (
                <Alert severity="error">{userDetails.error}</Alert>
              )
            )}
          </div>

          <Formik
            initialValues={
              userDetails?.userDetails
                ? {
                    name: userDetails.userDetails?.name,
                    phoneNumber: userDetails.userDetails?.phoneNumber,
                    city: userDetails.userDetails?.city,
                    province: userDetails.userDetails?.province,
                    profilePicture: userDetails.userDetails?.profilePicture,
                  }
                : {
                    name: "",
                    phoneNumber: "",
                    city: "",
                    province: "",
                    profilePicture: "",
                  }
            }
            // validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleChange }) => (
              <Form>
                <Grid className="mb-3" sx={{ width: "60vh" }}>
                  <Field
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    id="name"
                    name="name"
                    label="Name"
                    autoFocus
                  />

                  <ErrorMessage
                    name="name"
                    id="name"
                    component="div"
                    className="error text-danger"
                  />
                </Grid>
                <Grid className="mb-3">
                  <Field
                    fullWidth
                    as={TextField}
                    name="phoneNumber"
                    id="phoneNumber"
                    label="Phone Number"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    id="phoneNumber"
                    className="error text-danger"
                    component="div"
                  />
                </Grid>
                <Grid className="mb-3">
                  <InputLabel htmlFor="city">City</InputLabel>

                  <Field
                    fullWidth
                    as={Select}
                    name="city"
                    id="city"
                    // label="City"
                    onChange={handleChange}
                  >
                    {cityList?.map((item, index) => (
                      <MenuItem value={item.name} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="city"
                    id="city"
                    className="error text-danger"
                    component="div"
                  />
                </Grid>
                <Grid className="mb-3">
                  <InputLabel htmlFor="province">Province</InputLabel>

                  <Field
                    fullWidth
                    as={Select}
                    name="province"
                    id="province"
                    // label="Province"
                    onChange={handleChange}
                  >
                    {provinceList?.map((item, index) => (
                      <MenuItem value={item.name} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="province"
                    id="province"
                    className="error text-danger"
                    component="div"
                  />
                </Grid>
                <Grid className="mb-3">
                  {/* <Field
                    fullWidth
                    as={TextField}
                    name='profilePicture'
                    id='profilePicture'
                    label='Profile Picture'

                    />
                    <ErrorMessage
                    name="profilePicture"
                    id="profilePicture"
                    className="error text-danger"
                    component='div'
                    /> */}
                </Grid>
                <Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Save
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </div>
  );
}

export default UpdateUserProfile;
