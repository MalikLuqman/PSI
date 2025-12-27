// axiosInstance.js
import axios from "axios";
import { useEffect } from "react";
import app_vars from "./config";

const base_url = app_vars.domain.baseURL;
const axiosInstance = axios.create({
  baseURL: base_url, // Replace with your API base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent, like adding a token
    const token = localStorage.getItem("token"); // Example of getting token from local storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
