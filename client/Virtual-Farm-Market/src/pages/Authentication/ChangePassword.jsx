import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Container,
  styled,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";


const useStyles = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

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

  const [isVisible,setIsVisible] = useState(false)
  const [isVisibleConfirm,setIsVisibleConfirm] = useState(false)

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
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={ChangePasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
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
              <Grid container>
                <Grid item xs>
                  <Link href="/forgetpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <NavLink to="/register">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default ChangePassword;
