import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./Club.module.css";
import ClubInfo from "./ClubInfo";
import ClubSlide from "./ClubSlide";
import ClubCalendar from "./ClubCalendar";

const Club = () => {
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <ClubInfo />
        <ClubCalendar />
        <ClubSlide title="팀 목록" buttonName="팀 생성" />
        <ClubSlide title="곡 투표 목록" buttonName="투표 생성" />
        <ClubSlide title="동아리 사진들" buttonName="사진 등록" />
      </main>
    </DefaultLayout>
  );
};

export default Club;
