import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute({
  isAllowed,
  redirectPath = "/",
  children,
}) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
}