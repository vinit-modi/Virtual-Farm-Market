import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Alert,
  AlertTitle,
  Button,
  LinearProgress,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_ADMIN_EDIT_PROFILE } from "../../../Redux/Reducers/adminReducer";

const adminProfileEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Invalid email address"
    ),
});

function AdminProfileEdit() {
  const navigate = useNavigate();
  const adminReducer = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();

  const handleBackBtn = () => {
    navigate(`/admin/user`);
  };

  useEffect(() => {
    if (adminReducer.message === `Admin profile updated successfully`) {
      navigate("/admin/user");
      
    }
  }, [adminReducer.message]);

  return (
    <div>
      <h1>Edit Admin Profile</h1>
      {adminReducer.error && (
        <div>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {adminReducer.error}
          </Alert>
        </div>
      )}
      <Formik
        initialValues={
          adminReducer.profileData
            ? {
                name: adminReducer.profileData.name,
                phoneNumber: adminReducer.profileData.phoneNumber,
                email: adminReducer.profileData.email,
              }
            : {
                name: "",
                phoneNumber: "",
                email: "",
              }
        }
        validationSchema={adminProfileEditSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);

          dispatch({
            type: GET_ADMIN_EDIT_PROFILE,
            payload: { ...values, _id: adminReducer.adminId },
          });
        }}
      >
        {({ errors, touched }) => (
          <>
            {adminReducer.loading ? (
              <LinearProgress />
            ) : (
              <Form>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                {errors.name && touched.name ? (
                  <div className="text-danger">{errors.name}</div>
                ) : null}

                <Field
                  as={TextField}
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className="text-danger">{errors.phoneNumber}</div>
                ) : null}

                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                {errors.email && touched.email ? (
                  <div className="text-danger">{errors.email}</div>
                ) : null}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    style={{width: "200px" }}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleBackBtn()}
                    variant="contained"
                    color="primary"
                    className="ms-2"
                    style={{width: "100px" }}
                  >
                    Back
                  </Button>
                </div>
              </Form>
            )}{" "}
          </>
        )}
      </Formik>
    </div>
  );
}

export default AdminProfileEdit;
