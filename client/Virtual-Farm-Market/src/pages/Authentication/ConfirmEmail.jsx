import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_MESSAGE_ERROR,
  GET_CONFIRM_EMAIL_FOR_USER,
} from "../../Redux/Reducers/authReducer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function ConfirmEmail() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const tokenObj = {
    token: token,
  };

  const handleConfirm = () => {
    dispatch({ type: GET_CONFIRM_EMAIL_FOR_USER, payload: tokenObj });
  };

  const handleMoveToSignIn = () => {
    dispatch({ type: CLEAR_MESSAGE_ERROR, payload: "message" });
    navigate(`/user/login`);
  };

  useEffect(() => {
    dispatch({ type: CLEAR_MESSAGE_ERROR, payload: "message" });
    dispatch({ type: CLEAR_MESSAGE_ERROR, payload: "error" });
  }, []);

  useEffect(() => {
    if (auth.message === `Email confirmed successfully.`) {
      setConfirmed(true);
    }
  }, [auth.message]);

  useEffect(() => {
    if (auth.error) {
      setConfirmed(false);
    }
  }, [auth.error]);

  console.log(confirmed);
  return (
    <div>
      <Container maxWidth="sm" style={{ marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Email Confirmation
        </Typography>
        {auth.error && <Alert severity="error">{auth.error}</Alert>}
        {confirmed ? (
          <>
            {auth.loading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <div style={{ marginTop: "20px" }}>
                <div className="alert alert-success mt-3" role="alert">
                  Email confirmed! Thank you for confirming your email.
                  <br />
                  Now, you can go back to your browser. <br />
                  <br />
                  OR
                  <br />
                  Click here for Sign In :{" "}
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleMoveToSignIn()}
                    >
                      Sign In
                    </Button>
                  </>
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            <div className="alert alert-warning mt-3" role="alert">
              This is an email confirmation message. Please click the "Confirm
              Email" button to confirm your email.
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirm}
              style={{ marginRight: "10px" }}
            >
              Confirm Email
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ConfirmEmail;
