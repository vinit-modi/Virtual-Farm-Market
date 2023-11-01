import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  CLEARE_MESSAGE_PAYMENT,
  GET_ADD_NEW_CARD_PAYMENT,
} from "../../Redux/Reducers/paymentReducer";
import { Alert, AlertTitle, Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { green } from "@mui/material/colors";

const validateYupSchema = Yup.object().shape({
  cardholderName: Yup.string().required("Required"),
  cardNumber: Yup.string()
    .required("Required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
  cardExpiration: Yup.string()
    .required("Required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid MM/YY format"),
  cvv: Yup.string()
    .required("Required")
    .matches(/^\d{3}$/, "3 Digits"),
});

function Payment() {
  const dispatch = useDispatch();
  const payment = useSelector((state) => state.payment);

  const [addNewCard, setAddNewCard] = useState(true);

  useEffect(() => {
    if (payment.message) {
      toast.success(payment.message);
      dispatch({ type: CLEARE_MESSAGE_PAYMENT });
    }
  }, [payment.message]);

  return (
    <>
      <MDBContainer
        className="py-5"
        fluid
        style={{
          backgroundImage:
            "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp)",
        }}
      >
        <MDBRow className=" d-flex justify-content-center">
          <MDBCol md="10" lg="8" xl="5">
            <MDBCard className="rounded-3">
              <MDBCardBody className="p-4">
                <div className="text-center mb-4">
                  <h3>Settings</h3>
                  <h6>Payment</h6>
                </div>

                <Formik
                  initialValues={{
                    cardNumber: "",
                    cardExpiration: "",
                    cardholderName: "",
                    cvv: "",
                  }}
                  validationSchema={validateYupSchema}
                  onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    dispatch({
                      type: GET_ADD_NEW_CARD_PAYMENT,
                      payload: values,
                    });
                    resetForm();
                  }}
                >
                  {({ handleSubmit }) => (
                    <Box sx={{border:3, borderColor:green['A400'], borderRadius:2, p:2,mb:2}}>
                    <Form onSubmit={handleSubmit} >
                      <p className="fw-bold mb-4">Add new card:</p>
                      <Box sx={{ mb: 3  }}>
                        {payment.error ? (
                          <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {payment.error} — <strong>check it out!</strong>
                          </Alert>
                        ) : null}
                      </Box>
                      <Field
                        as={MDBInput}
                        label="Cardholder's Name"
                        size="md"
                        name="cardholderName"
                        placeholder="Aysole Crisen..."
                      />
                      <ErrorMessage
                        className="text-danger small mt-2 fw-bold"
                        name="cardholderName"
                        component="div"
                      />
                      <MDBRow className="my-4">
                        <MDBCol size="6">
                          <Field
                            as={MDBInput}
                            label="Card Number"
                            name="cardNumber"
                            size="md"
                            placeholder="---/---/----"
                          />
                          <ErrorMessage
                            className="text-danger small mt-2 fw-bold"
                            name="cardNumber"
                            component="div"
                          />
                        </MDBCol>
                        <MDBCol size="3">
                          <Field
                            as={MDBInput}
                            label="Expire"
                            size="md"
                            name="cardExpiration"
                            placeholder="MM/YY"
                          />
                          <ErrorMessage
                            className="text-danger small mt-2 fw-bold"
                            name="cardExpiration"
                            component="div"
                          />
                        </MDBCol>
                        <MDBCol size="3">
                          <Field
                            as={MDBInput}
                            label="CVV"
                            name="cvv"
                            type="password"
                            size="md"
                            placeholder="CVV"
                          />
                          <ErrorMessage
                            className="text-danger small mt-2 fw-bold"
                            name="cvv"
                            component="div"
                          />
                        </MDBCol>
                      </MDBRow>
                      <Box
                        sx={{ display: "flex", justifyContent: "end", mr: 3 }}
                      >
                        <Button type="submit" block>
                          {payment.loading ? (
                            <>
                              {" "}
                              <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              Loading...{" "}
                            </>
                          ) : (
                            <>
                              Add card
                              <SendIcon />
                            </>
                          )}
                        </Button>
                      </Box>
                    </Form></Box>
                  )}
                </Formik>
                <p className="fw-bold mb-4 pb-2">Saved cards:</p>
                <div className="d-flex flex-row align-items-center mb-4 pb-1">
                  <img
                    className="img-fluid"
                    src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                  />
                  <div className="flex-fill mx-3">
                    <div className="form-outline">
                      <MDBInput
                        label="Card Number"
                        id="form1"
                        type="text"
                        size="lg"
                        value="**** **** **** 3193"
                      />
                    </div>
                  </div>
                  <a href="#!">Remove card</a>
                </div>
                <div className="d-flex flex-row align-items-center mb-4 pb-1">
                  <img
                    className="img-fluid"
                    src="https://img.icons8.com/color/48/000000/visa.png"
                  />
                  <div className="flex-fill mx-3">
                    <div className="form-outline">
                      <MDBInput
                        label="Card Number"
                        id="form2"
                        type="text"
                        size="lg"
                        value="**** **** **** 4296"
                      />
                    </div>
                  </div>
                  <a href="#!">Remove card</a>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Payment;
