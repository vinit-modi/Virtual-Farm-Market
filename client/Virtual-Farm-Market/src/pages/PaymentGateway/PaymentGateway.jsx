import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentGatewayCheckoutForm from "../../components/PaymentGatewayCheckoutForm/PaymentGatewayCheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const PaymentGateway = ({ handleCheckout }) => {
  const stripePromise = loadStripe(
    "pk_test_51OFWzBKJoJhLdZdMkTtSNOLVx1hMdeU6tfuXfFdSXxQ7JEB663z1vIGuyqput1iTgb3EkuVRtfrVGriuZwAuKY6V00Q0dpS9OV"
  );
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentGatewayCheckoutForm handleCheckouts={handleCheckout} />
      </Elements>
    </>
  );
};

export default PaymentGateway;
