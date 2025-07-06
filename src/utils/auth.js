import api from "../services/api";

export const logout = async (navigate) => {
  await api.post("/auth/logout");
  localStorage.removeItem("user");
  navigate("/login");
};
