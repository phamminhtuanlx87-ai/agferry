import LoginForm from "@/components/auth/LoginForm";
import { isAuthenticated } from "@/services/authService";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return <LoginForm></LoginForm>;
};
export default LoginPage;
