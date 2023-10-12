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
    // Do something with request error
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default Axios;
