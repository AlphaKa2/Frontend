import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://172.16.210.60:8000", 
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});

export default axiosInstance;

