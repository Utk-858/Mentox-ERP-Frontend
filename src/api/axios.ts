
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const instance = axios.create({
  baseURL: `${process.env.API_GATEWAY_URL}/api/v1`,
  withCredentials: true, // ✅ important for CORS, cookies, secure auth
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;