import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/auth";
import type { JSX } from "@emotion/react/jsx-runtime";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
