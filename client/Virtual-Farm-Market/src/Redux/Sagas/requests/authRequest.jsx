
import Axios from "../../../Utils/Axios";

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
  const response = await Axios.post(`/api/changePasswordForUser`, payload);
  return response;
}
export async function requestUpdatedUserDetail(payload) {
  const response = await Axios.post(`/api/updateProfile`, payload);
  return response;
}
export async function requestGetUserDetails(_id) {
  const response = await Axios.post(`/api/getUser`, _id);
  return response;
}

export async function requestConfirmEmailUser(payload) {
  
  const response = await Axios.post(`/api/confirmEmail`, payload);
  console.log('RESPONCE FOR CONFIREM +>',response)
  return response;
}

export async function requestGetUserById(payload) {
  console.log("payload ==>", payload);
  const idObj = {
    _id: payload,
  };
  const response = await Axios.post(`/api/getUser`, idObj);
  return response;
}

export async function requestUserProfileImageUser() {
  const response = await Axios.get(`/api/getUserImage`);
  return response;
}