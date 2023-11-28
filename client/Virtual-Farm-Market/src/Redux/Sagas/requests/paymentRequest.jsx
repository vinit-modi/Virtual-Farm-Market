import Axios from "../../../Utils/Axios";

export async function requestAddNewCardPayment(payload) {
  const response = await Axios.post(`/api/addNewCard`, payload);
  return response;
}

export async function requestAllCardPayment() {
  const response = await Axios.get(`/api/getAllSavedCards`);
  return response;
}

export async function requestDeleteCardPayment(payload) {
  const response = await Axios.post(`/api/deleteCard`,payload);
  return response;
}

export async function requestMakeDefaultCardPayment(payload) {
  const response = await Axios.post(`/api/makeDefaultCard`,payload);
  return response;
}

export async function requestMakePayment(payload) {
  const response = await Axios.post(`/api/makePayment`,payload);
  return response;
}
