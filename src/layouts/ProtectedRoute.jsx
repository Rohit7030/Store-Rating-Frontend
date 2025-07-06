import { Navigate, Outlet } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user")); 

export default function ProtectedRoute({ roles }) {
  if (!user) return <Navigate to="/login" />;
  if (!roles.includes(user.role)) return <Navigate to="/" />;

  return <Outlet />;
}
