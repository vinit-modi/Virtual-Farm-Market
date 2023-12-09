import React from "react";
import PaymentAlert from "../../components/Alert/PaymentAlert";
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  CLEARE_MESSAGE_PAYMENT,
  GET_ALL_CARD_PAYMENT,
  GET_MAKE_PAYMENT,
} from "../../Redux/Reducers/paymentReducer";
import DefaultButton from "../../components/Buttons/DefaultButton";
import { green, orange, red } from "@mui/material/colors";
import {
  CLEAR_MESSAGE_ADDRESS,
  CLEAR_OBJECT_ADDRESS,
  GET_ALL_ADDRESS,
  GET_DELETE_ADDRESS,
  GET_MAKE_DEFAULT_ADDRESS,
  GET_OBJECT_ADDRESS,
} from "../../Redux/Reducers/addressReducer";
import AddressAlert from "../../components/Alert/AddressAlert";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { AddCircle } from "@mui/icons-material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

import Visa from "../../Assets/card/visa.png";
import Discover from "../../Assets/card/discover.png";
import JCB from "../../Assets/card/jcb.png";
import MasterCard from "../../Assets/card/maestro.png";
import UnionPay from "../../Assets/card/unionpay.png";
import DinersClub from "../../Assets/card/dinersclub.png";
import AmericanExpress from "../../Assets/card/americanexpress.png";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import SendIcon from "@mui/icons-material/Send";
import { useContext } from "react";
import { CheckoutContext } from "../../Utils/ContextAPIs/CheckoutContext";
import {
  GET_ALL_NOTI,
  GET_COUNT_OF_NOTI,
} from "../../Redux/Reducers/userNotificationReducer";
import {
  CLEAR_CART_LIST_CART,
  GET_ALLPRODUCTS_CART,
  GET_CART_ITEM_COUNT_CART,
} from "../../Redux/Reducers/cartReducer";

const cardImages = {
  Visa,
  Discover,
  JCB,
  MasterCard,
  UnionPay,
  "Diners Club": DinersClub,
  "American Express": AmericanExpress,
};

function DefaultCredentials() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const payment = useSelector((state) => state.payment);
  const address = useSelector((state) => state.address);
  const stripePayment = useSelector((state) => state.stripePayment);

  const { checkoutData, setCheckoutData } = useContext(CheckoutContext);

  useEffect(() => {
    //To clear address from edit addressObj of address.
    dispatch({ type: CLEAR_OBJECT_ADDRESS });

    dispatch({ type: GET_ALL_CARD_PAYMENT });
    dispatch({ type: GET_ALL_ADDRESS });
  }, []);

  useEffect(() => {
    dispatch({ type: GET_ALL_CARD_PAYMENT });
    dispatch({ type: GET_ALL_ADDRESS });
  }, [navigate, dispatch]);

  useEffect(() => {
    if (address.message) {
      toast.success(address.message);
    }
    dispatch({ type: CLEAR_MESSAGE_ADDRESS });
    dispatch({ type: GET_ALL_ADDRESS });
  }, [address.message]);

  useEffect(() => {
    if (payment.message) {
      toast.success(payment.message);
      dispatch({ type: GET_ALL_NOTI });
      dispatch({ type: GET_COUNT_OF_NOTI });
      dispatch({ type: CLEAR_CART_LIST_CART });
      setCheckoutData(null);

      dispatch({ type: GET_ALLPRODUCTS_CART });
      dispatch({ type: GET_CART_ITEM_COUNT_CART });

      dispatch({ type: CLEARE_MESSAGE_PAYMENT });

      navigate("/user/paymentsuccess");
    }
  }, [payment.message]);

  const handleGoToPaymentPage = () => {
    navigate("/user/paymentgateway");
  };

  const handleGoToAddressPage = () => {
    navigate("/user/addaddress");
  };

  const handleRemoveAddress = (id) => {
    dispatch({ type: GET_DELETE_ADDRESS, payload: { _id: id } });
  };

  const handleAddressEdit = (id) => {
    dispatch({ type: GET_OBJECT_ADDRESS, payload: { _id: id } });
    navigate("/user/addaddress");
  };

  const handleMakeDefaultAddress = (id) => {
    dispatch({ type: GET_MAKE_DEFAULT_ADDRESS, payload: { _id: id } });
  };

  const handleProceedToCheckout = () => {
    console.log({
      products: JSON.stringify(checkoutData.products),
      amount: checkoutData.amount,
      userAddress:
        address.addressList[0].defaultAddress && address.addressList[0]._id,
    });
    JSON.stringify(checkoutData)
      ? dispatch({
          type: GET_MAKE_PAYMENT,
          payload: {
            products: JSON.stringify(checkoutData.products),
            amount: checkoutData.amount,
            userAddress:
              address.addressList[0].defaultAddress &&
              address.addressList[0]._id,
          },
        })
      : navigate("/user/dashboard");
  };

  return (
    <>
      <Container maxWidth="md">
        {address.loading || stripePayment.loading || payment.loading ? (
          <>
            <br />
            <br />
            <br />
            <LinearProgress color="success" />
          </>
        ) : (
          <Grid container direction="column">
            <Grid item>
              <Container maxWidth="md" sx={{ mt: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: orange["A700"],
                      "&:hover": { bgcolor: orange["A400"] },
                    }}
                    endIcon={<SendIcon />}
                    onClick={() => handleProceedToCheckout()}
                    disabled={
                      !(checkoutData && checkoutData.amount) ||
                      !stripePayment.cardList.length ||
                      !address.addressList.length ||
                      !address.addressList[0]?.defaultAddress ||
                      !stripePayment.cardList[0]?.isDefaultCard
                    }
                  >
                    Proceed to checkout (Total:{" "}
                    {checkoutData ? checkoutData.amount : 0})
                  </Button>
                </Box>
                <Box>
                  <Typography variant="h4">Selected Payment Method:</Typography>
                  <Box>
                    {payment.error && (
                      <Alert severity="error">{payment.error}</Alert>
                    )}
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      size="large"
                      onClick={() => handleGoToPaymentPage()}
                      startIcon={<AddCircle />}
                    >
                      ADD/
                      {<ChangeCircleIcon />}
                      CHANGE DEFAULT
                    </Button>
                  </Box>
                  <Box minWidth={450}>
                    {stripePayment.cardList.length !== 0 &&
                      !stripePayment.cardList[0]?.isDefaultCard && (
                        <Alert severity="error" sx={{ m: 2 }}>
                          Select card as a default:-{" "}
                          <Button onClick={() => handleGoToPaymentPage()}>
                            Select Default Card
                          </Button>
                        </Alert>
                      )}
                    {stripePayment.cardList.length ? (
                      stripePayment.cardList[0].isDefaultCard ? (
                        <Box>
                          <Paper
                            elevation={4}
                            sx={{
                              p: 3,
                              mb: 2,
                            }}
                          >
                            <Grid
                              container
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Grid item>
                                <Grid
                                  container
                                  justifyContent={"space-between"}
                                  spacing={1}
                                  direction="column"
                                >
                                  <Grid item>
                                    <Typography variant="h6">
                                      <strong>Card Number:</strong> **** ****
                                      **** {stripePayment.cardList[0].last4}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Stack direction="row">
                                      <Stack>
                                        <Typography variant="h6">
                                          <strong>Expires:&nbsp;</strong>
                                          {stripePayment.cardList[0].exp_month +
                                            "/" +
                                            stripePayment.cardList[0].exp_year}
                                        </Typography>
                                      </Stack>
                                      <Stack sx={{ ml: 4 }}>
                                        <Typography variant="h6">
                                          <strong>CVV:</strong> ***
                                        </Typography>
                                      </Stack>
                                    </Stack>
                                  </Grid>
                                  <Grid item>
                                    <Stack direction="row" spacing={1}>
                                      <Stack>
                                        <Typography variant="h5">
                                          Card brand:
                                        </Typography>
                                      </Stack>
                                      <Stack>
                                        <Typography variant="h5">
                                          {stripePayment.cardList[0].brand}
                                        </Typography>
                                      </Stack>
                                      <Stack>
                                        <img
                                          className="img-fluid"
                                          src={
                                            cardImages[
                                              stripePayment.cardList[0].brand
                                            ]
                                          }
                                          alt={stripePayment.cardList[0].brand}
                                          style={{
                                            height: "30px",
                                            width: "auto",
                                            marginTop: "2px",
                                          }}
                                        />
                                      </Stack>
                                    </Stack>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid item sx={{ textAlign: "right" }}>
                                  <DefaultButton />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Box>
                      ) : (
                        <PaymentAlert {...{ handleGoToPaymentPage }} />
                      )
                    ) : (
                      <PaymentAlert {...{ handleGoToPaymentPage }} />
                    )}
                  </Box>
                </Box>
              </Container>
            </Grid>

            <Grid item>
              <Container maxWidth="md">
                <Box>
                  <Typography variant="h4" sx={{ mt: 6 }}>
                    Address List
                  </Typography>
                  {address.addressList.length ? (
                    <>
                      <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Button
                          size="large"
                          onClick={() => handleGoToAddressPage()}
                          startIcon={<AddCircle />}
                        >
                          ADD ADDRESS
                        </Button>
                      </Box>

                      {address.addressList.map((item, index) => (
                        <Card sx={{ p: 2, mb: 2 }} elevation={3} key={index}>
                          <Grid container>
                            <Grid item xs={10}>
                              <Box>
                                <Typography variant="h5">
                                  Name: {item.fullName}
                                </Typography>
                                <Typography variant="h5">
                                  Phone number: {item.phoneNumber}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                  <strong>Address :</strong> {item.address}{" "}
                                  {item.address2}
                                </Typography>
                                <Typography>
                                  <strong>City : </strong>
                                  {item.city}
                                </Typography>
                                <Box sx={{ display: "flex" }}>
                                  <Typography>
                                    <strong>Province : </strong>
                                    {item.province}
                                  </Typography>
                                  <Typography sx={{ mx: 4 }}>
                                    <strong> Postal Code : </strong>
                                    {item.postalCode}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={2}>
                              {item.defaultAddress ? (
                                <DefaultButton />
                              ) : (
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "end",
                                  }}
                                >
                                  <Tooltip
                                    title="Make Dafault"
                                    open={
                                      !(
                                        address.addressList[0].defaultAddress &&
                                        address.addressList[0].defaultAddress
                                      )
                                    }
                                    arrow
                                  >
                                    <Button
                                      disableElevation
                                      variant="outlined"
                                      onClick={() =>
                                        handleMakeDefaultAddress(item._id)
                                      }
                                      sx={{
                                        border: "none",
                                        "&:hover": {
                                          bgcolor: green[500],
                                          color: "white",
                                          border: "none",
                                        },
                                      }}
                                    >
                                      <BookmarkAddIcon />
                                    </Button>{" "}
                                  </Tooltip>
                                </Box>
                              )}
                            </Grid>
                          </Grid>

                          <Box sx={{ display: "flex", justifyContent: "end" }}>
                            <Button
                              onClick={() => handleRemoveAddress(item._id)}
                              variant="contained"
                              sx={{
                                color: "white",
                                bgcolor: red["A400"],
                                "&:hover": {
                                  bgcolor: red[800],
                                  color: "white",
                                  border: "none",
                                },
                              }}
                              endIcon={<DeleteIcon />}
                            >
                              DELETE ADDRESS
                            </Button>
                            <Button
                              variant="contained"
                              sx={{ ml: 1 }}
                              onClick={() => {
                                handleAddressEdit(item._id);
                              }}
                            >
                              Edit
                            </Button>
                          </Box>
                        </Card>
                      ))}
                    </>
                  ) : (
                    <AddressAlert {...{ handleGoToAddressPage }} />
                  )}
                </Box>
              </Container>
            </Grid>
            <Grid item>
              <Container maxWidth="md" sx={{ mt: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: orange["A700"],
                      "&:hover": { bgcolor: orange["A400"] },
                    }}
                    endIcon={<SendIcon />}
                    onClick={() => handleProceedToCheckout()}
                    disabled={
                      !(checkoutData && checkoutData.amount) ||
                      !stripePayment.cardList.length ||
                      !address.addressList.length ||
                      !address.addressList[0]?.defaultAddress ||
                      !stripePayment.cardList[0]?.isDefaultCard
                    }
                  >
                    Proceed to checkout (Total:{" "}
                    {checkoutData ? checkoutData.amount : 0})
                  </Button>
                </Box>
              </Container>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

export default DefaultCredentials;
