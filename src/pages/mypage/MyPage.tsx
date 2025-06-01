import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "@/pages/mypage/MyPage.module.css";
// import Slide from "@/components/slide/Slide";
import Button from "@/components/button/Button";
import MusicNote1 from "/public/musical_note1.svg";
import MusicNote2 from "/public/musical_notes2.svg";
// import TeamCards from "@/components/cards/TeamCard";
import Modal from "@/components/modal/Modal";
import ProfilEdit from "@/pages/mypage/ProfilEdit";
// 임시 프로필사진
import Profile from "@/pages/vote/style/profile.svg";
import { useGetMyTimeTables } from "@/apis/timetable";
import Loading from "@/components/loading/Loading";
import { useGetMyTeamList } from "@/apis/team";
import Slide from "@/components/slide/Slide";
import type { MyTeamInfo } from "@/types/team";
import TeamCards from "@/components/cards/TeamCard";
import { useNavigate } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";

const MyPage = () => {
  const { data: myTimeTables, isLoading } = useGetMyTimeTables();
  const { data: myTeamLists, isLoading: MyTeamLoading } = useGetMyTeamList();
  const navigate = useNavigate();

  if (isLoading || !myTimeTables || MyTeamLoading) return <Loading />;

  return (
    <DefaultLayout>
      <main className={styles.mypage_container}>
        <section className={styles.myprofile_box}>
          <header className={styles.profile_title}>
            <div>
              <img src={MusicNote1} alt="음표" />
              <h2>마이 프로필</h2>
            </div>

            <Modal
              title="마이프로필 수정하기"
              trigger={<button>수정하기</button>}
            >
              <ProfilEdit />
            </Modal>
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
          {myTeamLists?.data && (
            <Slide<MyTeamInfo> items={myTeamLists.data}>
              {(item) => <TeamCards item={item} />}
            </Slide>
          )}
        </section>

        <section className={styles.timetable_box}>
          <header className={styles.timetable_title}>
            <div>
              <img src={MusicNote1} alt="음표" />
              <h2>내 시간표 관리</h2>
            </div>
            <Button
              variant="primary"
              className={styles.timetable_button}
              onClick={() => navigate(PageEndpoints.POST_TIME_SCHEDULE)}
            >
              시간표 추가
            </Button>
          </header>

          <Slide items={myTimeTables.data} size="sm">
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
