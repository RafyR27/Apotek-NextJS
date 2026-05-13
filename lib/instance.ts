import environment from "@/config/environment";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: environment.BASE_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject({
      message: error?.response?.data?.message || error?.message,
      status: error?.response?.status,
    });
  },
);

export default instance;