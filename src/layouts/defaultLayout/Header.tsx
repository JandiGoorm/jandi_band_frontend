import Button from "@/components/button/Button";
import { PageEndpoints } from "@/constants/endpoints";
import { useAuthStore } from "@/stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import CreateClubModal from "./CreateClubModal";
import styles from "./Header.module.css";

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link to={PageEndpoints.HOME}>
          <img src="/logo_anti.png" alt="logo" className={styles.logo} />
        </Link>

        <div className={styles.right}>
          <CreateClubModal />

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
    </div>
  );
};

export default Header;
