import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthServiceProvider";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
