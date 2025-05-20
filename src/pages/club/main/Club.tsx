import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./Club.module.css";
import ClubInfo from "./clubInfo/ClubInfo";
import ClubCalendar from "./clubCalendar/ClubCalendar";
import TeamSlide from "./clubSlide/TeamSlide";
import VoteSlide from "./clubSlide/VoteSlide";
import PhotoSlide from "./clubSlide/PhotoSlide";

const Club = () => {
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <ClubInfo />
        <ClubCalendar />
        <TeamSlide />
        <VoteSlide />
        <PhotoSlide />
      </main>
    </DefaultLayout>
  );
};

export default Club;
