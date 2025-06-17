import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./AboutService.module.css";

const AboutService = () => {
  return (
    <DefaultLayout>
      <div className={styles.fullPageWrapper}>
        <section className={styles.fullPageSection}>
          <img src="/images/main.png" alt="인트로" />
          <div className={`${styles.caption} ${styles.fadeIn}`}>
            <h2>밴드 연습, 아직도 단톡방에서 조율해?</h2>
            <p>Rhythmeet으로 초대할게!</p>
            <p>함주 시간 찾기부터 곡 선정, 일정 관리, 공연 홍보까지</p>
            <br />
            <h3>카카오톡으로 간편하게 가입해요!</h3>
          </div>
        </section>

        <section className={styles.fullPageSection}>
          <img src="/images/time.png" alt="시간표 기능" />
          <div className={`${styles.caption} ${styles.fadeIn}`}>
            <h2>가능한 시간대 자동 계산!</h2>
            <p>초대코드로 팀원들을 초대하고,</p>
            <p>포지션별·멤버별 가능한 시간을 바로 확인해요.</p>
            <br />
            <p>마이페이지에서 자주 사용하는 시간표를 저장할 수 있고</p>
            <h3>에브리타임 시간표까지 불러올 수 있어요!</h3>
          </div>
        </section>

        <section className={styles.fullPageSection}>
          <img src="/images/vote.png" alt="곡 투표 기능" />
          <div className={`${styles.caption} ${styles.fadeIn}`}>
            <h2>곡 투표도 Rhythmeet에서!</h2>
            <p>
              팀원들이 원하는 곡을 직접 올리고, 유튜브 링크로 바로 듣고
              투표해요.
            </p>
            <br />
            <p>그래프로 결과까지 한눈에!</p>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default AboutService;
