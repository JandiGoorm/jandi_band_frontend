import { useCallback } from "react";
import styles from "./SignIn.module.css";
import InfoSection from "./InfoSection";

const SignIn = () => {
  const handleKakaoLogin = useCallback(() => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const url = new URL("https://kauth.kakao.com/oauth/authorize");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_type", "code");
    window.location.href = url.toString();
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.hero_content}>
        <img src="/logo_anti.png" alt="logo" className={styles.logo} />

        <div className={styles.text_container}>
          <div className={styles.title}>
            <h3>카카오 계정으로</h3>
            <h3>간편하게 로그인 하세요.</h3>
          </div>

          <p className={styles.sub_title}>
            연습부터 무대까지, 밴드부를 위한 올인원 플랫폼
          </p>
        </div>

        <button className={styles.kakao_button} onClick={handleKakaoLogin}>
          <img
            src="/kakao_icon.png"
            alt="kakao_icon"
            className={styles.kakao_icon}
          />
          <span>카카오 계정으로 계속하기</span>
        </button>
        <div className={styles.scroll_indicator}>
          ↓ 스크롤해서 더 알아보기 ↓
        </div>
      </section>

      {/* 스크롤 정보 */}
      <InfoSection />

      <div className={styles.ctaFooter}>
        <p>우리가 모일 시간, Rhythmeet에서 찾아보세요.</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          지금 함께하기
        </button>
      </div>
    </main>
  );
};

export default SignIn;
