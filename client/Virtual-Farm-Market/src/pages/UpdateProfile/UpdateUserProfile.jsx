import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Alert, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_CITY_LIST,
  GET_PROVINCE_LIST,
} from "../../Redux/Reducers/authReducer";
import {
  GET_UPDATED_USER_DETAIL,
  GET_USER,
} from "../../Redux/Reducers/userReducer";
import { Dialog } from "primereact/dialog";
import AvatarEdit from "react-avatar-edit";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { green } from "@mui/material/colors";

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[^\d]+$/, "Name should not contain digits")
    .required("Name is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number should contain only 10 digits.")
    .required("Phone number is required"),
  city: Yup.string().required("City is required"),
  province: Yup.string().required("Province is required"),
});

function UpdateUserProfile() {
  const auth = useSelector((state) => state.auth);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const param_id = auth._idOfLoggedIn;

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

  const handleBack = () => {
    navigate("/user/dashboard");
  };

  useEffect(() => {
    const value = {
      _id: param_id,
    };
    dispatch({ type: GET_PROVINCE_LIST });
    dispatch({ type: GET_CITY_LIST });
    dispatch({ type: GET_USER, payload: value });
    // dispatch({ type: CLEAR_MESSAGE_USERREDUCER });
  }, []);

  useEffect(() => {
    if (userDetails.message) {
      navigate("/user/dashboard");
    }
  }, [userDetails.message]);

  useEffect(() => {
    if (auth.cityList || auth.provinceList) {
      setProvinceList(auth.provinceList);
      setCityList(auth.cityList);
    }
  }, [auth.cityList || auth.provinceList]);

  return (
    <Container maxWidth="md">
      <Grid
        spacing={2}
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        {" "}
        <Typography sx={{ ml: 3, mt: 3 }} component="h1" variant="h4">
          Edit Profile
        </Typography>
        <Box
          sx={{
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="m-4">
            {userDetails.error === `Request failed with status code 500` ? (
              <Alert severity="error" sx={{ my: 2 }}>
                Selected User does not exist or Network issue
              </Alert>
            ) : (
              userDetails.error && (
                <Alert severity="error" sx={{ my: 2 }}>
                  {userDetails.error}
                </Alert>
              )
            )}
          </div>

          <Formik
            enableReinitialize
            initialValues={
              userDetails?.userDetails
                ? {
                    name: userDetails.userDetails?.name,
                    phoneNumber: userDetails.userDetails?.phoneNumber,
                    city: userDetails.userDetails?.city,
                    province: userDetails.userDetails?.province,
                    profilePicture: auth.userProfileImage,
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
                          profileFinal.length
                            ? profileFinal
                            : auth.userProfileImage
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
                          setFieldValue("profilePicture", image);
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

                <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleBack()}
                    startIcon={<ArrowBackIcon />}
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 2,
                      ml: 2,
                      width: "24%",
                      bgcolor: green["A700"],
                    }}
                  >
                    <FileDownloadDoneIcon />
                    Save
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Container>
  );
}

export default UpdateUserProfile;
