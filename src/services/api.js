import axios from "axios";

const api = axios.create({
  // for localhost baseURL: "http://localhost:5000/api",
  baseURL : "https://store-rating-app-7m68.onrender.com/api",
  withCredentials: true, 
});

export default api;
