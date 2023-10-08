import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
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
import {
  GET_CITY_LIST,
  GET_PROVINCE_LIST,
} from "../../Redux/Reducers/authReducer";
import EditIcon from "@mui/icons-material/Edit";
import {
  GET_UPDATED_USER_DETAIL,
  GET_USER,
} from "../../Redux/Reducers/userReducer";
import { Dialog } from "primereact/dialog";
import AvatarEdit from "react-avatar-edit";
import profileEmptyImage from "../../Assets/profileEmptyImage.png";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  city: Yup.string().required("City is required"),
  province: Yup.string().required("Province is required"),
  profilePicture: Yup.string().required("Profile Picture is required"),
});

function UpdateUserProfile() {
  const auth = useSelector((state) => state.auth);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  const param_id = "651e94a6fb0b84e048c1b1b7";

  const [provinceList, setProvinceList] = useState();
  const [cityList, setCityList] = useState();

  const [imageCrop, setImageCrop] = useState(false);
  const [src, setSrc] = useState(false);
  const [profile, setProfile] = useState([]);
  const [pview, setPview] = useState(false);

  const profileFinal = profile.map((item) => item.pview);

  const onClose = () => {
    setPview(null);
  };
  const onCrop = (view) => {
    setPview(view);
  };
  const saveCropImage = async () => {
    setProfile([{ pview }]);
    setImageCrop(false);
  };

  useEffect(() => {
    const value = {
      _id: param_id,
    };
    dispatch({ type: GET_PROVINCE_LIST });
    dispatch({ type: GET_CITY_LIST });
    dispatch({ type: GET_USER, payload: value });
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
                    profilePicture: profileEmptyImage,
                  }
                : {
                    name: "",
                    phoneNumber: "",
                    city: "",
                    province: "",
                    profilePicture: null,
                  }
            }
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const value = {
                name: values.name,
                phoneNumber: values.phoneNumber,
                city: values.city,
                provience: values.province,
                profilePicture: values.profilePicture,
              };

              console.log(value);
              dispatch({ type: GET_UPDATED_USER_DETAIL, payload: value });
            }}
          >
            {({ handleChange, setFieldValue }) => (
              <Form>
                <Grid>
                  <div className="text-center p-4">
                    <div className="flex flex-column justify-content-center align-items-center">
                      <img
                        style={{
                          height: "200px",
                          width: "200px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          border: "4px solid black",
                        }}
                        onClick={() => setImageCrop(true)}
                        src={
                          profileFinal.length ? profileFinal : profileEmptyImage
                        }
                      />
                    </div>
                  </div>
                  <Field
                    as={Dialog}
                    header={() => (
                      <p className="text-2xl font-semibold textColor">
                        Update Profile
                      </p>
                    )}
                    visible={imageCrop}
                    maximizable
                    style={{
                      width: "50vw",
                      background: "#e9e9e9cf",
                      padding: "20px",
                      border: "3px solid green",
                      borderRadius: "20px",
                    }}
                    onHide={() => setImageCrop(false)}
                  >
                    <div className="confirmation-content flex flex-column align-items-center">
                      <Field
                        as={AvatarEdit}
                        width={500}
                        height={400}
                        onCrop={(image) => {
                          onCrop(image);
                          setFieldValue("profile", image);
                        }}
                        onClose={onClose}
                        src={src}
                        shadingColor={"#474649"}
                        backgroundColor={"#474649"}
                      />
                      <div className="flex flex-column align-items-center mt-5 w-12">
                        <div className="flex justify-content-around w-12 mt-4">
                          <Button
                            id=""
                            name=""
                            variant="contained"
                            className="btn btn-primary"
                            label="Save"
                            icon="pi pi-check"
                            onClick={saveCropImage}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Field>
                </Grid>
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

                <Grid>
                  <NavLink
                    className="btn btn-primary w-100 mt-3 mb-2"
                    to="/dashboard"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    <FileDownloadDoneIcon />
                    Save
                  </NavLink>
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
