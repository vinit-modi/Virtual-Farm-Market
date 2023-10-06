import axios from "axios";
import Axios from "../../../Utils/Axios";
import { async } from "regenerator-runtime";

export async function requestPostSignUpUser(payload) {
  const response = await Axios.post(`/api/signUp`, payload);
  return response;
}

export async function requestSignInUser(payload) {
  const response = await Axios.post(`/api/login`, payload);
  return response;
}
export async function requestCityList(payload) {
  const response = await Axios.get(`/api/getAllCities`);
  return response;
}
export async function requestProvinceList(payload) {
  const response = await Axios.get(`/api/getAllProvinces`);
  return response;
}
export async function requestChangePassword(payload) {
  const response = await Axios.post(`/api/changePassword`, payload);
  return response;
}
