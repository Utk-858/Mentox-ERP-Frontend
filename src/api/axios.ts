
import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_GATEWAY_URL}/api/v1`,
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