import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "@/pages/mypage/MyPage.module.css";
import Profile from "@/pages/vote/style/profile.svg";
import Slide from "@/components/slide/Slide";
import Button from "@/components/button/Button";
import MusicNote1 from "/public/musical_note1.svg";
import MusicNote2 from "/public/musical_notes2.svg";
import TeamCards from "@/components/cards/TeamCards";

const MyPage = () => {
  const sampleItems = [
    { id: 1, name: "아이템 1" },
    { id: 2, name: "아이템 2" },
    { id: 3, name: "아이템 3" },
    { id: 4, name: "아이템 4" },
    { id: 5, name: "아이템 5" },
    { id: 6, name: "아이템 6" },
  ];

  return (
    <DefaultLayout>
      <main className={styles.mypage_container}>
        <section className={styles.myprofile_box}>
          <header className={styles.profile_title}>
            <div>
              <img src={MusicNote1} alt="음표" />
              <h2>마이 프로필</h2>
            </div>
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

        <section className={styles.team_box}>
          <div>
            <img src={MusicNote2} alt="음표" />
            <h2>참여 팀 목록</h2>
          </div>
          <Slide items={sampleItems} size="sm">
            {(item) => <TeamCards title={item.name} />}
          </Slide>
        </section>

        <section className={styles.timetable_box}>
          <header className={styles.timetable_title}>
            <div>
              <img src={MusicNote1} alt="음표" />
              <h2>내 시간표 관리</h2>
            </div>
            <Button variant="primary" className={styles.timetable_button}>
              시간표 추가
            </Button>
          </header>
          <Slide items={sampleItems} size="sm">
            {(item) => (
              <div className={styles.itemCard}>
                <h3>{item.name}</h3>
                <p>ID: {item.id}</p>
              </div>
            )}
          </Slide>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default MyPage;
