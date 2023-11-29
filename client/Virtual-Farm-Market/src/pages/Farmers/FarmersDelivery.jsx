import {
  Alert,
  Box,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useEffect } from "react";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CLEARE_MESSAGE_FARMER,
  GET_ALL_ORDER_FARMER,
} from "../../Redux/Reducers/Farmer/farmerReducer";

function FarmersDelivery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const farmer = useSelector((state) => state.farmer);

  useEffect(() => {
    dispatch({ type: GET_ALL_ORDER_FARMER });
    return () => {};
  }, []);

  useEffect(() => {
    if (farmer.message) {
      dispatch({ type: GET_ALL_ORDER_FARMER });
      dispatch({ type: CLEARE_MESSAGE_FARMER });
    }
  }, [farmer.message]);

  useEffect(() => {}, [dispatch, navigate]);

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 15 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Order Delivery Status
          </Typography>

          {farmer.loading ? (
            <LinearProgress color="success" />
          ) : (
            <>
              {farmer.error && <Alert severity="error">{farmer.error}</Alert>}
              {farmer.orderList.length ? (
                farmer.orderList.map((order, index) => (
                  <OrderCard {...{ order }} key={index} userType="Farmer" />
                ))
              ) : (
                <>
                  <Typography variant="h3" p={5} textAlign={"center"}>
                    NO Order Found
                  </Typography>
                </>
              )}
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

export default FarmersDelivery;
