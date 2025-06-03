import { useNavigate } from "react-router-dom";
import styles from "./PrivateRoute.module.css";
import { useAuthStore } from "@/stores/authStore";
import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import Button from "@/components/button/Button";
import { PageEndpoints } from "@/constants/endpoints";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  requireAuth: boolean;
}
const PrivateRoute = ({ children, requireAuth }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  if (requireAuth && !user) {
    return (
      <DefaultLayout>
        <div className={styles.container}>
          <span className={styles.title}>로그인이 필요한 서비스 입니다.</span>
          <span className={styles.text}>
            해당 서비스를 이용 하시려면 로그인을 해주세요.
          </span>
          <Button size="lg" onClick={() => navigate(PageEndpoints.SIGN_IN)}>
            로그인하기
          </Button>
        </div>
      </DefaultLayout>
    );
  }

  return children;
};

export default PrivateRoute;
