import { useGetMe, useSignIn } from "@/apis/auth";
import Loading from "@/components/loading/Loading";
import { PageEndpoints } from "@/constants/endpoints";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  const { data } = useSignIn(code ?? "");
  const { refetch: getMe, data: profile } = useGetMe();
  const { setUser } = useAuthStore();
  const from = location.state?.from?.pathname || PageEndpoints.HOME;
  // 로그인 처리후 토큰 저장 및 isRegistered 여부에 따른 로직 처리
  useEffect(() => {
    if (!data) return;

    const { isRegistered, accessToken, refreshToken } = data.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    if (isRegistered) {
      // 회원가입이 되어있으면 유저 정보를 가져옴
      getMe();
    } else {
      // 회원가입이 안되어있으면 회원가입 페이지로 이동
      navigate(PageEndpoints.SIGN_UP, {
        state: { from }, // 회원가입 후 다시 돌아갈 수 있게 from 유지
      });
    }
  }, [data, getMe, navigate, setUser]);

  // 유저 정보를 가져오면 유저 정보를 저장하고 홈으로 이동
  useEffect(() => {
    if (!profile) return;
    setUser(profile.data);
    navigate(from, { replace: true });
  }, [profile, navigate, setUser]);

  return <Loading />;
};

export default Callback;
