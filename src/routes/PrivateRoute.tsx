// components/auth/PrivateRoute.tsx
import { useGetMe } from "@/apis/auth";
import { PageEndpoints } from "@/constants/endpoints";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  //   const {user,isInitialized} = useAuthStore();
  const location = useLocation();
  const { data: user, isLoading: isLoading } = useGetMe();

  if (isLoading) return;

  if (!user) {
    return (
      <Navigate to={PageEndpoints.HOME} state={{ from: location }} replace />
    );
  }
  return <>{children}</>;
};

export default PrivateRoute;
