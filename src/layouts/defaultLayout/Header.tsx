import Button from "@/components/button/Button";
import { PageEndpoints } from "@/constants/endpoints";
import { useAuthStore } from "@/stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Dropdown from "@/components/dropdown/Dropdown";
import { FaGuitar, FaUsers, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

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
                <span>
                  <img src={user.profilePhoto} className={styles.profile_img} />
                </span>
              }
              items={[
                {
                  label: "공연 목록",
                  icon: <FaGuitar />,
                  onSelect: () => navigate(PageEndpoints.PROMOTION),
                },
                {
                  label: "동아리 목록",
                  icon: <FaUsers />,
                  onSelect: () => navigate(PageEndpoints.CLUB_LIST),
                },
                {
                  label: "마이페이지",
                  icon: <FaUserCircle />,
                  onSelect: () => navigate(PageEndpoints.MYPAGE),
                },
                {
                  label: "로그아웃",
                  icon: <FaSignOutAlt />,
                  onSelect: () => {
                    logout();
                    window.location.href = PageEndpoints.HOME;
                  },
                },
              ]}
            />
          ) : (
            <Button
              onClick={() => navigate(PageEndpoints.HOME)}
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
