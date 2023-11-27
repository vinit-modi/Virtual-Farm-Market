import Axios from "../../../Utils/Axios";

export function requestAddCardStripePayment(payload) {
  const response = Axios.post("/api/stripeAddCard", payload);
  return response;
}

export function requestAllCardStripePayment() {
  const response = Axios.get("/api/stripeGetAllCards");
  return response;
}

export function requestMakeDefaultCardStripePayment(payload) {
  const response = Axios.post("/api/stripeMakeDefaultCard",payload);
  return response;
}

export function requestDeleteCardStripePayment(payload) {
  const response = Axios.post("/api/stripeDeleteCard",payload);
  return response;
}
