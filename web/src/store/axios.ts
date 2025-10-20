import axios from "axios";
// const BASE_API_URL = "https://round-2-api.onrender.com/";

const BASE_API_URL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
export const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 20000,

  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
