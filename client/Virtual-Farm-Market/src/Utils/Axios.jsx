import axios from "axios";
import authToken from "./authToLocalStorage";
const Axios = axios.create({
  baseURL: "http://localhost:3001",
});

Axios.interceptors.request.use(
  function (config) {
    if (authToken()) {
      config.headers.Authorization = `${authToken()}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default Axios;
