import { Navigate } from "react-router-dom";
import sessionService from "../services/sessionService";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const session = sessionService.getSession();

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
