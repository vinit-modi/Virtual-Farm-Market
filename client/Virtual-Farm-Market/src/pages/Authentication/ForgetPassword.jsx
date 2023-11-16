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

const ForgetPasswordSchema = Yup.object().shape({
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
});

function ForgetPassword() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={useStyles}>
        <MailOutlineIcon
          style={{ fontSize: 80, color: "#3f51b5", width: "100%" }}
          fullWidth
        />
        <Typography
          component="h1"
          className="d-flex justify-content-center"
          variant="h5"
        >
          Forget Password
        </Typography>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={ForgetPasswordSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "100%", marginTop: "1rem" }}>
              <div>
                <p>
                  Enter your Registered email address below to receive password
                  reset instruction
                </p>
              </div>
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "1rem" }}
              >
                Send Reset Link
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    component={RouterLink}
                    to="/user/login"
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

export default ForgetPassword;
