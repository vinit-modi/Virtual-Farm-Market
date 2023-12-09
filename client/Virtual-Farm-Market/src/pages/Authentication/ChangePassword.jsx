import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_MESSAGE_ERROR_CHANGE_PASSWORD,
  GET_CHANGE_PASSWORD,
} from "../../Redux/Reducers/handlePasswordReducer";

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .required("Required")
    .min(8, "Must be 8 characters or more")
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?&]+/, "One special character")
    .matches(/\d+/, "One number"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm New Password is required"),
});

function ChangePassword() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const setPassword = useSelector((state) => state.setPassword);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (setPassword.message) {
      dispatch({
        type: CLEAR_MESSAGE_ERROR_CHANGE_PASSWORD,
        payload: "message",
      });
      navigate("/user/dashboard");
    }
  }, [setPassword.message]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        {setPassword?.error ? (
          <div className="m-4">
            <Alert severity="error">{setPassword?.error}</Alert>
          </div>
        ) : null}
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={ChangePasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              const value = {
                _id: auth.userId,
                currentPassword: values.oldPassword,
                newPassword: values.newPassword,
              };
              console.log(value);
              dispatch({ type: GET_CHANGE_PASSWORD, payload: value });
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form sx={{ width: "100%", marginTop: 3 }}>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="oldPassword"
                label="Old Password"
                name="oldPassword"
                autoFocus
              />
              <ErrorMessage
                name="oldPassword"
                component="div"
                className="error text-danger"
              />

              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="newPassword"
                label="New Password"
                name="newPassword"
                type={!isVisible ? `password` : `text`}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setIsVisible(!isVisible)}
                        aria-label="password visibility"
                        edge="end"
                      >
                        {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="error text-danger"
              />

              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="confirmNewPassword"
                label="Confirm New Password"
                name="confirmNewPassword"
                type={!isVisibleConfirm ? `password` : `text`}
                autoComplete="off"
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
                name="confirmNewPassword"
                component="div"
                className="error text-danger"
              />

              {/* <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    onChange={handleCheckboxChange}
                  />
                }
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Change Password"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default ChangePassword;
