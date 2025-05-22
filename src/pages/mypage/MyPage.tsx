import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "@/pages/mypage/MyPage.module.css";
import Profile from "@/pages/vote/style/profile.svg";

const MyPage = () => {
  return (
    <DefaultLayout>
      <main className={styles.mypage_container}>
        <section className={styles.myprofile_box}>
          <header className={styles.profile_title}>
            <h2>마이 프로필</h2>
            <button>수정하기</button>
          </header>
          <div className={styles.profile_content}>
            <img src={Profile} alt="프로필 사진" />

            <dl className={styles.profile_info}>
              <div>
                <dt>이름</dt>
                <dd>김개똥</dd>
              </div>
              <div>
                <dt>닉네임</dt>
                <dd>김개똥</dd>
              </div>
              <div>
                <dt>포지션 </dt>
                <dd>베이스</dd>
              </div>
              <div>
                <dt>소속대학</dt>
                <dd>대대대학교</dd>
              </div>
            </dl>
          </div>
        </section>

        <section>참여 팀 목록</section>

        <section>내 시간표 관리</section>
      </main>
    </DefaultLayout>
  );
};

export default MyPage;
