import { Navigate, Outlet } from "react-router-dom";

type AuthWrapperProps = {
  children: JSX.Element;
  isAllowed: boolean;
  redirectTo?: string;
};

export const AuthWrapper = ({
  children,
  isAllowed,
  redirectTo = "/",
}: AuthWrapperProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};
