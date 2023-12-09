import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  styled,
  Grid,
  Link,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link as RouterLink } from "react-router-dom";

const useStyles = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "2rem",
});


const ResetPasswordSchema = Yup.object().shape({
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
  .required("Please enter your password")
  .required("Required")
  .min(8, "Must be 8 characters or more")
  .matches(/[a-z]+/, "One lowercase character")
  .matches(/[A-Z]+/, "One uppercase character")
  .matches(/[@$!%*#?&]+/, "One special character")
  .matches(/\d+/, "One number"),
});

function ResetPassword() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={useStyles}>
        <MailOutlineIcon style={{ fontSize: 80, color: "#3f51b5" }} />
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // Handle form submission here, e.g., reset the password
              console.log(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "100%", marginTop: "1rem" }}>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />

              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password" 

              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red" }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "1rem" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="body2"
                    style={{ marginTop: "1rem" }}
                  >
                    Back to Login
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}

export default ResetPassword;
