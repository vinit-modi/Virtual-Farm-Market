import React from "react";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_ORDER } from "../../Redux/Reducers/OrderReducer";
import { Alert, Container, LinearProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);

  useEffect(() => {
    dispatch({ type: GET_ALL_ORDER });
    return () => {};
  }, []);

  useEffect(() => {}, [dispatch, navigate]);

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4">Orders</Typography>
        {order.loading ? (
          <LinearProgress color="success" />
        ) : (
          <>
            {order.error && <Alert severity="error">{order.error}</Alert>}
            {order.orderList.length ? (
              order.orderList.map((order, index) => (
                <OrderCard {...{ order }} key={index} userType="Customer" />
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
      </Container>
    </>
  );
}

export default Order;
