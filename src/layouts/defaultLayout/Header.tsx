import { useAuthStore } from "@/stores/authStore";
import styles from "./Header.module.css";
import Button from "@/components/button/Button";
import { PageEndpoints } from "@/constants/endpoints";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src="/logo_anti.png" alt="logo" className={styles.logo} />
        {user ? (
          <Button onClick={logout} variant="secondary">
            로그아웃
          </Button>
        ) : (
          <Button
            onClick={() => navigate(PageEndpoints.SIGN_IN)}
            variant="secondary"
          >
            로그인
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
