import React, { useEffect, useState } from "react";
import {
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
  GET_ALL_CARD_PAYMENT,
  GET_DELETE_CARD_PAYMENT,
  GET_MAKE_DEFAULT_CARD_PAYMENT,
} from "../../Redux/Reducers/paymentReducer";
import { Alert, AlertTitle, Box, Button, Tooltip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { blue, green, orange, red } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router-dom";

const validateYupSchema = Yup.object().shape({
  cardholderName: Yup.string()
    .required("Required")
    .matches(/^[^\d]+$/, "Cardholder name should not contain digits."),
  cardNumber: Yup.string()
    .required("Required")
    .matches(/^(\d{15}|\d{16})$/, "Card number must be 15 or 16 digits"),
  cardExpiration: Yup.string()
    .required("Required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid MM/YY format"),
  cvv: Yup.string()
    .required("Required")
    .matches(/^\d{3}$/, "3 Digits"),
});

function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payment = useSelector((state) => state.payment);
  const [addNewCard, setAddNewCard] = useState(false);

  useEffect(() => {
    if (payment.message) {
      toast.success(payment.message);
      dispatch({ type: GET_ALL_CARD_PAYMENT });
      dispatch({ type: CLEARE_MESSAGE_PAYMENT });
    }
  }, [payment.message]);

  useEffect(() => {
    dispatch({ type: GET_ALL_CARD_PAYMENT });
  }, []);

  function handleDeleteCard(id) {
    dispatch({
      type: GET_DELETE_CARD_PAYMENT,
      payload: { _id: id },
    });
  }

  function handleCheckout() {
    navigate("/user/defaultcreds");
  }

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
                  <h2>Payment</h2>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    m: 1,
                  }}
                >
                  <Tooltip title="Add New Card">
                    <Button
                      sx={{ mx: 2 }}
                      // sx={{
                      //   bgcolor: green["A700"],
                      // }}
                      variant="outlined"
                      startIcon={addNewCard ? <RemoveIcon /> : <AddIcon />}
                      onClick={() => setAddNewCard(!addNewCard)}
                    >
                      ADD NEW CARD
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleCheckout()}
                      sx={{ bgcolor: orange[500] }}
                    >
                      CHECKOUT
                    </Button>
                  </Tooltip>
                </Box>

                {addNewCard ? (
                  <>
                    {payment.loading ? null : (
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
                          setAddNewCard(false);
                        }}
                      >
                        {({ handleSubmit }) => (
                          <Box
                            sx={{
                              border: 3,
                              borderColor: green["A400"],
                              borderRadius: 2,
                              p: 2,
                              mb: 2,
                              boxShadow: 10,
                            }}
                          >
                            <Form onSubmit={handleSubmit}>
                              <p className="fw-bold mb-4">Add new card:</p>
                              <Box sx={{ mb: 3 }}>
                                {payment.error ? (
                                  <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {payment.error} —{" "}
                                    <strong>check it out!</strong>
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
                                sx={{
                                  display: "flex",
                                  justifyContent: "end",
                                  mr: 3,
                                }}
                              >
                                <Tooltip title="Send Card Details">
                                  <Button
                                    variant="contained"
                                    disabled={payment.loading}
                                    type="submit"
                                    block
                                  >
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
                                        Add card &nbsp;
                                        <SendIcon />
                                      </>
                                    )}
                                  </Button>{" "}
                                </Tooltip>
                              </Box>
                            </Form>
                          </Box>
                        )}
                      </Formik>
                    )}
                  </>
                ) : null}

                <Box>
                  <p className="fw-bold mb-4 pb-2">Saved cards:</p>

                  <Box>
                    {
                      <>
                        {payment.allCards ? (
                          <>
                            {payment.allCards.map((card, index) => (
                              <Box
                                sx={{
                                  border: 2,
                                  borderRadius: 3,
                                  px: 3,
                                  pt: 2,
                                  mb: 2,
                                  borderColor: blue[200],
                                  display: "flex",
                                  flexDirection: "column",
                                  boxShadow: 4,
                                }}
                                key={card._id}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                    ml: 1,
                                    mb: 1,
                                  }}
                                >
                                  {card.isCardDefault ? (
                                    <Tooltip title="Default Card">
                                      <BookmarkIcon
                                        sx={{
                                          color: green["A700"],
                                          "&:hover": {
                                            cursor: "pointer",
                                          },
                                        }}
                                      />
                                    </Tooltip>
                                  ) : null}
                                </Box>
                                <div className="d-flex flex-row align-items-center mb-4 pb-1">
                                  <img
                                    className="img-fluid"
                                    src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                                  />
                                  <div className="flex-fill mx-3">
                                    <div className="form-outline">
                                      <MDBInput
                                        label="Card Holder Name"
                                        id="form1"
                                        type="text"
                                        size="lg"
                                        value={`${card.cardholderName}`}
                                      />
                                    </div>
                                    <div className="form-outline">
                                      <MDBInput
                                        label="Card Number"
                                        id="form1"
                                        type="text"
                                        size="lg"
                                        value={`**** **** **** ${card.lastFourDigits}`}
                                      />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                      {card.isCardDefault ? null : (
                                        <Tooltip title="Default Card For Payment">
                                          <Button
                                            disableElevation
                                            variant="contained"
                                            onClick={() =>
                                              dispatch({
                                                type: GET_MAKE_DEFAULT_CARD_PAYMENT,
                                                payload: { _id: card._id },
                                              })
                                            }
                                            sx={{
                                              "&:hover": {
                                                bgcolor: green[500],
                                                color: "white",
                                              },
                                            }}
                                          >
                                            Make Default&nbsp;
                                            <BookmarkAddIcon />
                                          </Button>
                                        </Tooltip>
                                      )}
                                      <Tooltip title="Delete A Card">
                                        <Button
                                          variant="outlined"
                                          onClick={() =>
                                            handleDeleteCard(card._id)
                                          }
                                          sx={{
                                            ml: 0.5,
                                            "&:hover": {
                                              bgcolor: red[400],
                                              color: "white",
                                              borderColor: "white",
                                            },
                                          }}
                                        >
                                          <DeleteOutlineIcon />
                                        </Button>
                                      </Tooltip>
                                    </div>
                                  </div>
                                </div>
                              </Box>
                            ))}
                          </>
                        ) : (
                          <>No Card Found. Please add new card.</>
                        )}
                      </>
                    }
                  </Box>
                </Box>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Payment;
