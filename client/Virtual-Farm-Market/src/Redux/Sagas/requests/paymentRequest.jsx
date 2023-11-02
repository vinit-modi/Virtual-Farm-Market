import Axios from "../../../Utils/Axios";

export async function requestAddNewCardPayment(payload) {
  console.log("PAYLOAD ===> ", payload);
  const response = await Axios.post(`/api/addNewCard`, payload);
  console.log("RESPONSE ===> ", response);
  return response;
}

export async function requestAllCardPayment() {
  const response = await Axios.get(`/api/getAllSavedCards`);
  console.log("RESPONSE ===> ", response);
  return response;
}

export async function requestDeleteCardPayment(payload) {
  console.log("PAYLOAD ===> ", payload);
  const response = await Axios.post(`/api/deleteCard`,payload);
  console.log("RESPONSE ===> ", response);
  return response;
}

export async function requestMakeDefaultCardPayment(payload) {
  console.log("PAYLOAD ===> ", payload);
  const response = await Axios.post(`/api/makeDefaultCard`,payload);
  console.log("RESPONSE ===> ", response);
  return response;
}
