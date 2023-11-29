import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./PaymentSuccess.css";
import { Box, Button } from "@mui/material";
import { green, orange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

function PaymentSuccess({ setTotalAmount }) {
  const payment = useSelector((state) => state.payment);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTotalAmount(0);
  }, []);

  useEffect(() => {
    if (payment.message) {
      toast.success(payment.message);
      dispatch({ type: CLEARE_MESSAGE_PAYMENT });
    }
  }, [payment.message]);

  const handleMakeShopping = () => {
    navigate("/user/dashboard");
  };

  const handleMyOrderList = () => {
    navigate("/user/order");
  };

  return (
    <div className="container" style={{ maxWidth: 470 }}>
      <div className="printer-top"></div>
      <div className="paper-container">
        <div className="printer-bottom"></div>
        <div className="paper">
          <div className="main-contents">
            <div className="success-icon">&#10004;</div>
            <div className="success-title">Payment Complete</div>
            <div className="success-description">
              Thank you for completing the payment! You will shortly receive an
              email of your order confirmation.
            </div>
            <div className="order-details">
              <div className="order-number-label">Order ID</div>
              <div className="order-number">
                {payment.paymentSuccess && payment.paymentSuccess.orderNumber}
              </div>
              <div className="complement">Thank You!</div>
            </div>
          </div>
          <div className="jagged-edge"></div>
        </div>
      </div>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: green["A700"],
            color: "white",
            border: "none",
            "&:hover": { bgcolor: green[500], color: "white", border: "none" },
          }}
          onClick={() => handleMakeShopping()}
        >
          continue shopping
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: orange["A700"],
            color: "white",
            border: "none",
            "&:hover": { bgcolor: orange[500], color: "white", border: "none" },
          }}
          onClick={() => handleMyOrderList()}
        >
          My orders
        </Button>
      </Box>
    </div>
  );
}

export default PaymentSuccess;
