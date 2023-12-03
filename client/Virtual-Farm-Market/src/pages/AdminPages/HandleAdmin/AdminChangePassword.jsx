import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Alert,
  AlertTitle,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_MESSAGE_ADMIN, GET_ADMIN_CHANGE_PASSWORD } from "../../../Redux/Reducers/adminReducer";

const SignupSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current Password is required")
    .min(8, "Must be 8 characters or more"),
  newPassword: Yup.string()
    .required("Required")
    .min(8, "Must be 8 characters or more")
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?&]+/, "One special character")
    .matches(/\d+/, "One number"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function AdminChangePassword() {
  const [isVisibleOld, setIsVisibleOld] = React.useState(false);
  const [isVisibleNew, setIsVisibleNew] = React.useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminReducer = useSelector((state) => state.adminReducer);

  const handleBackBtn = () => {
    navigate(`/admin/user`);
  };

  useEffect(() => {
    if (adminReducer.message === `Password changed successfully`) {
      //Toast 'Password changed successfully'
      dispatch({type: CLEAR_MESSAGE_ADMIN})
      navigate(`/admin/user`);
    }
  }, [adminReducer.message]);

  return (
    <>
      <h1>Change Admin Password</h1>
      {adminReducer.error && (
        <div>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {adminReducer.error}
          </Alert>
        </div>
      )}
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
          const newSendableValue = {
            _id: adminReducer.adminId,
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          };
          dispatch({
            type: GET_ADMIN_CHANGE_PASSWORD,
            payload: newSendableValue,
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="currentPassword"
              label="Current Password"
              variant="outlined"
              margin="normal"
              fullWidth
              type={isVisibleOld ? `text` : `password`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsVisibleOld(!isVisibleOld)}
                      aria-label="password visibility"
                      edge="end"
                    >
                      {isVisibleOld ? (
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
              className="text-danger"
              name="currentPassword"
              component="div"
            />

            <Field
              as={TextField}
              name="newPassword"
              label="New Password"
              variant="outlined"
              margin="normal"
              fullWidth
              type={isVisibleNew ? `text` : `password`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsVisibleNew(!isVisibleNew)}
                      aria-label="password visibility"
                      edge="end"
                    >
                      {isVisibleNew ? (
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
              className="text-danger"
              name="newPassword"
              component="div"
            />

            <Field
              as={TextField}
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              fullWidth
              type={isVisibleConfirm ? `text` : `password`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsVisibleConfirm(!isVisibleConfirm)}
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
              className="text-danger"
              name="confirmPassword"
              component="div"
            />

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                style={{ width: "190px" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Change Password
              </Button>
              <Button
                onClick={() => handleBackBtn()}
                variant="contained"
                color="primary"
                className="ms-2"
                style={{ width: "100px" }}
              >
                Back
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AdminChangePassword;
