import Button from "@/components/button/Button";
import { PageEndpoints } from "@/constants/endpoints";
import { useAuthStore } from "@/stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Dropdown from "@/components/dropdown/Dropdown";

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
          {user ? (
            <Dropdown
              trigger={
                <img src={user.profilePhoto} className={styles.profile_img} />
              }
              items={[
                {
                  label: "공연 목록",
                  onSelect: () => navigate(PageEndpoints.PROMOTION),
                },
                {
                  label: "동아리 목록",
                  onSelect: () => navigate(PageEndpoints.CLUB_LIST),
                },
                {
                  label: "마이페이지",
                  onSelect: () => navigate(PageEndpoints.MYPAGE),
                },
                {
                  label: "로그아웃",
                  onSelect: () => {
                    logout();
                    window.location.href = PageEndpoints.SIGN_IN;
                  },
                },
              ]}
            />
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
