import Axios from "../../../Utils/Axios";

export function requestAddNewAddress(payload) {
  const response = Axios.post("/api/addNewAddress", payload);
  return response;
}

export function requestAllAddress() {
  const response = Axios.get("/api/getAllAddress");
  return response;
}

export function requestDeleteAddress(payload) {
  const response = Axios.post("/api/deleteAddress",payload);
  return response;
}

export function requestObjectAddress(payload) {
  const response = Axios.post("/api/getAddress",payload);
  return response;
}

export function requestEditAddress(payload) {
  const response = Axios.post("/api/editAddress",payload);
  return response;
}

export function requestMakeDefaultAddress(payload) {
  const response = Axios.post("/api/makeDefaultAddress",payload);
  return response;
}
