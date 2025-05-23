import { useAuthStore } from "@/stores/authStore";
import styles from "./Header.module.css";
import Button from "@/components/button/Button";
import { PageEndpoints } from "@/constants/endpoints";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { usePostClub } from "@/apis/club";
import { queryClient } from "@/config/queryClient";

const Header = () => {
  const { mutate: postClub } = usePostClub();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link to={PageEndpoints.HOME}>
          <img src="/logo_anti.png" alt="logo" className={styles.logo} />
        </Link>

        <div className={styles.right}>
          <button
            onClick={() => {
              postClub(
                { name: "test", universityId: "1" },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["clubs"] });
                  },
                }
              );
            }}
          >
            동아리 만들기
          </button>

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
