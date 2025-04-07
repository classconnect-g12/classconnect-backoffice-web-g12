import { Navigate } from "react-router-dom";
import sessionService from "../services/sessionService";
import { JSX } from "react";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const session = sessionService.getSession();

  if (session) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
