import axios from "axios";

const api = axios.create({
  // for localhost baseURL: "http://localhost:5000/api",
  baseURL : "https://store-rating-backend.vercel.app/api",
  withCredentials: true, 
});

export default api;
