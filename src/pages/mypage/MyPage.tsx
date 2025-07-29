import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "@/pages/mypage/MyPage.module.css";
import Slide from "@/components/slide/Slide";
import Button from "@/components/button/Button";
import MusicNote1 from "/public/musical_note1.svg";
import MusicNote2 from "/public/musical_notes2.svg";
import TeamCards from "@/components/cards/TeamCard";
import Modal from "@/components/modal/Modal";
import ProfilEdit from "@/pages/mypage/ProfilEdit";
import { useGetMyTimeTables } from "@/apis/timetable";
import Loading from "@/components/loading/Loading";
import { useGetMyTeamList } from "@/apis/team";
import type { MyTeamInfo } from "@/types/team";
import { useNavigate } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
// 내 정보 불러오기
import { useGetInfo } from "@/apis/mypage";
import TimeTableCards from "@/components/cards/TimeTableCards";
import { buildPath } from "@/utils/buildPath";
import type { TimeTableResponse } from "@/types/timeTable";
import LeaveModal from "@/components/modal/leaveModal/LeaveModal";
import { useBreak } from "@/apis/auth";

const MyPage = () => {
  const { data: myInfoResponse, refetch } = useGetInfo();
  const { data: myTimeTables, isLoading } = useGetMyTimeTables();
  const { data: myTeamLists, isLoading: MyTeamLoading } = useGetMyTeamList();
  const { mutate: userBreak } = useBreak();
  const navigate = useNavigate();

  if (isLoading || !myTimeTables || MyTeamLoading || !myInfoResponse?.data)
    return <Loading />;

  const myInfo = myInfoResponse.data;

  const positionLabelMap: Record<string, string> = {
    VOCAL: "보컬",
    GUITAR: "기타",
    BASS: "베이스",
    DRUM: "드럼",
    KEYBOARD: "키보드",
    OTHER: "그 외",
  };

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
              {(setOpen) => (
                <ProfilEdit
                  myInfo={myInfo}
                  setOpen={setOpen}
                  refetch={refetch}
                />
              )}
            </Modal>
          </header>
          <div className={styles.profile_content}>
            <img src={myInfo.profilePhoto} alt="프로필 사진" />

            <dl className={styles.profile_info}>
              <div>
                <dt>이름</dt>
                <dd>{myInfo.nickname}</dd>
              </div>
              <div>
                <dt>포지션 </dt>
                <dd>{positionLabelMap[myInfo.position]}</dd>
              </div>
              <div>
                <dt>소속대학</dt>
                <dd>{myInfo.university}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.team_box}>
          <div className={styles.slide_title_box}>
            <img src={MusicNote2} alt="음표" />
            <h2>참여 팀 목록</h2>
            <p>좌우로 넘겨보세요!</p>
          </div>
          {myTeamLists?.data && (
            <Slide<MyTeamInfo> items={myTeamLists.data}>
              {(item) => <TeamCards item={item} />}
            </Slide>
          )}
        </section>

        <section className={styles.timetable_box}>
          <header className={styles.timetable_title}>
            <div className={styles.timetable_title_box}>
              <div className={styles.slide_title_box}>
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
            </div>
            <p>자주 사용하는 시간표를 저장할 수 있어요</p>
          </header>

          <Slide<TimeTableResponse> items={myTimeTables.data} size="sm">
            {(item) => (
              <TimeTableCards
                timeTable={item}
                onClick={() => {
                  navigate(
                    buildPath(PageEndpoints.MY_TIMETABLE_DETAIL, {
                      id: item.id,
                    })
                  );
                }}
              />
            )}
          </Slide>
        </section>
        <section className={styles.out_button_box}>
          <LeaveModal
            trigger={<p className={styles.out_text}>회원탈퇴</p>}
            title="탈퇴하기"
            description={
              <>
                정말 탈퇴하시겠어요?
                <br />
                탈퇴시 30일간 재가입이 불가합니다.
              </>
            }
            onLeave={() => {
              userBreak(undefined, {
                onSuccess: () => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  window.location.href = PageEndpoints.HOME;
                },
              });
            }}
          />
        </section>
      </main>
    </DefaultLayout>
  );
};

export default MyPage;
