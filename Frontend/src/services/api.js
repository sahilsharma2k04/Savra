import axios from "axios";

const API = axios.create({
  baseURL: "https://savra-e3iu.onrender.com/api/dashboard",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;