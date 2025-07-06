import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();
  const publicPaths = ["/login", "/register", "/forgot-password", "/verify-otp", "/reset-password"];
  const showNavbar = !publicPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default App;
