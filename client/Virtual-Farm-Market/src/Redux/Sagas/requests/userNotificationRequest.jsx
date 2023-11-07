import Axios from "../../../Utils/Axios";

export const requestCountNoti = async () => {
  const response = await Axios.get(`/api/notificationCount`);
  return response;
};
export const requestAllNoti = async () => {
  const response = await Axios.get(`/api/getAllNotification`);
  return response;
};

export const requestObjNoti = async (payload) => {
  const response = await Axios.post(`/api/getNotification`, payload);
  return response;
};

export const requestDeleteNoti = async (payload) => {
  const response = await Axios.post(`/api/deleteNotification`, payload);
  return response;
};

export const requestAllDeleteNoti = async () => {
  const response = await Axios.get(`/api/clearAllNotification`);
  return response;
};
