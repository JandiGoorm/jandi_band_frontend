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

  // console.log(isLoading);
  // console.log(user);
  if (isLoading) return;

  if (!user) {
    return (
      <Navigate to={PageEndpoints.HOME} state={{ from: location }} replace />
    );
  }

  // console.log("로그인되어있음");
  return <>{children}</>;
};

export default PrivateRoute;
