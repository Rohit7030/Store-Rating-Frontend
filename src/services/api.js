import axios from "axios";

const api = axios.create({
  // for localhost baseURL: "http://localhost:5000/api",
  baseURL : process.env.VITE_BACKEND_URL,
  withCredentials: true, 
});

export default api;
