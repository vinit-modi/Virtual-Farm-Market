import Axios from "../../../Utils/Axios";

export async function requestAdminLogin(payload) {
  const response = await Axios.post(`/api/adLogin`, payload);
  return response;
}

export async function requestAdminProfileData(payload) {
  const response = await Axios.post(`/api/getAdminProfile`, payload);
  return response;
}
export async function requestAdminEditProfile(payload) {
  const response = await Axios.post(`/api/updateAdminProfile`, payload);

  return response;
}
export async function requestAdminChangePassword(payload) {
  const response = await Axios.post(`/api/changePassword`, payload);
  return response;
}
export async function requestAdminSideUserList(payload) {
    console.log("payload==>>", payload);
  const response = await Axios.post(`/api/adGetAllUser`, payload);
    console.log("response==>>", response);
  return response;
}
export async function requestAdminUserDeleteRequest(payload) {
  console.log("payload==>>", payload);
  const response = await Axios.post(`/api/deleteUser`, payload);
  console.log("response==>>", response);
  return response;
}

export async function requestAdminUserEditObj(payload) {
  console.log("payload==>>", payload);
  const response = await Axios.post(`/api/adGetSpecificUser`, payload);
  console.log("response==>>", response);
  return response;
}
export async function requestAdminUpdateUserProfile(payload) {
  console.log("payload==>>", payload);
  const response = await Axios.post(`/api/updateUserProfile`, payload);
  console.log("response==>>", response);
  return response;
}
