import Axios from "../../../Utils/Axios";

//USER:-
export const requestAllUserFaqs = () => {
  const response = Axios.get(`/api/getAllFaqForUser`);
  return response;
};

//ADMIN:-
export const requestAllAdminFaqs = () => {
  const response = Axios.get(`/api/getAllFaq`);
  return response;
};
export const requestAddAdminFaqs = (payload) => {
  const response = Axios.post(`/api/addFaq`,payload);
  return response;
};
export const requestObjectOfAdminFaqs = (payload) => {
  const response = Axios.post(`/api/getSpecificFaq`,payload);
  return response;
};
export const requestUpdateOfAdminFaqs = (payload) => {
  const response = Axios.post(`/api/updateFaq`,payload);
  return response;
};
export const requestDeleteOfAdminFaqs = (payload) => {
  const response = Axios.post(`/api/deleteFaq`,payload);
  return response;
};
