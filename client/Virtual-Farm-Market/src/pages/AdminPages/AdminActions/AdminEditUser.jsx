import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GET_ADMIN_UPDATE_USER_PROFILE,
  GET_ADMIN_USER_EDIT_OBJECT,
} from "../../../Redux/Reducers/adminReducer";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from "@mui/material";

import { Dialog } from "primereact/dialog";
import AvatarEdit from "react-avatar-edit";
import profileEmptyImage from "../../../Assets/profileEmptyImage.png";
import {
  GET_CITY_LIST,
  GET_PROVINCE_LIST,
} from "../../../Redux/Reducers/authReducer";
import { GET_USER } from "../../../Redux/Reducers/userReducer";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  city: Yup.string().required("City is required"),
  province: Yup.string().required("Province is required"),
  //   profilePicture: Yup.mixed().required('Profile picture is required'),
});

function AdminEditUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const adminReducer = useSelector((state) => state.adminReducer);
  const navigate = useNavigate();

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
    if (
      !adminReducer?.userObjForEdit ||
      adminReducer?.userObjForEdit._id !== id
    )
      dispatch({ type: GET_ADMIN_USER_EDIT_OBJECT, payload: { _id: id } });
  }, [id, adminReducer?.userObjForEdit]);

  useEffect(() => {
    const value = {
      _id: id,
    };
    dispatch({ type: GET_PROVINCE_LIST });
    dispatch({ type: GET_CITY_LIST });
    dispatch({ type: GET_USER, payload: value });
  }, []);

  useEffect(() => {
    if (adminReducer.message) {
      navigate("/admin/user");
    }
  }, [adminReducer.message]);

  return (
    <div>
      <Formik
        initialValues={
          adminReducer?.userObjForEdit
            ? {
                name: adminReducer?.userObjForEdit.name,
                phoneNumber: adminReducer?.userObjForEdit.phoneNumber,
                email: adminReducer?.userObjForEdit.email,
                city: adminReducer?.userObjForEdit.city,
                province: adminReducer?.userObjForEdit.province,
                profilePicture: adminReducer?.userObjForEdit.profilePicture,
              }
            : {
                name: "",
                phoneNumber: "",
                email: "",
                city: "",
                province: "",
                profilePicture: null,
              }
        }
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const payloadObj = {
            _id: id,
            name: values.name,
            phoneNumber: values.phoneNumber,
            city: values.city,
            province: values.province,
            profilePicture: values.profilePicture,
          };
          dispatch({
            type: GET_ADMIN_UPDATE_USER_PROFILE,
            payload: payloadObj,
          });
          console.log(values);
        }}
      >
        {({ touched, errors, values, handleChange, setFieldValue }) => (
          <Form>
            {adminReducer.loading ? (
              <CircularProgress />
            ) : (
              <>
                <h1>Edit User</h1>

                <Grid container spacing={2}>
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
                              : profileEmptyImage
                          }
                        />
                      </div>
                    </div>
                    <Field
                      as={Dialog}
                      header={() => (
                        <p className="text-2xl font-semibold textColor">
                          Update Admin Profile
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
                            console.log(image);
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
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      fullWidth
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      id="phoneNumber"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="city">City</InputLabel>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      error={touched.province && Boolean(errors.province)}
                    >
                      <Select
                        label="City"
                        variant="outlined"
                        fullWidth
                        id="city"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        error={touched.city && Boolean(errors.city)}
                        helperText={touched.city && errors.city}
                      >
                        {auth.cityList
                          ? auth.cityList.map((item, index) => (
                              <MenuItem value={item.name} key={index}>
                                {item.name}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                      <FormHelperText>
                        {touched.city && errors.city}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="province">Province</InputLabel>

                    <FormControl
                      variant="outlined"
                      fullWidth
                      error={touched.province && Boolean(errors.province)}
                    >
                      <Select
                        id="province"
                        name="province"
                        value={values.province}
                        onChange={handleChange}
                      >
                        {auth.provinceList
                          ? auth.provinceList.map((item, index) => (
                              <MenuItem value={item.name} key={index}>
                                {item.name}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                      <FormHelperText>
                        {touched.province && errors.province}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                    <Button
                      onClick={() => navigate("/admin/user")}
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="ms-2"
                    >
                      Back
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AdminEditUser;
