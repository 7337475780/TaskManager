import axios from "axios";
import { BASE_URL } from "./apiPath.js";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//Response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        //Redirect to login
        window.location.href = "/login";
      } else if (err.response.status === 500) {
        console.error("Server error. Please try again");
      }
    } else if (err.code === "ECONNABORTED") {
      console.error("Request timeout");
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
