import axios from "axios";

import config from "../config/api.config";

let calledOnce = false;

axios.interceptors.request.use(
  (request) => {
    if (config.apiKey) {
      request.headers["Accept"] = "application/json";
      request.headers["Authorization"] = "Bearer " + config.apiKey;
    }
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !calledOnce
    ) {
      originalRequest._retry = true;
      calledOnce = true;
    }
    return Promise.reject(error);
  }
);
