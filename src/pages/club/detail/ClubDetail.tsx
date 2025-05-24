import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./ClubDetail.module.css";
import ClubInfo from "./clubInfo/ClubInfo";
import ClubCalendar from "./clubCalendar/ClubCalendar";
import TeamSlide from "./clubSlide/TeamSlide";
import VoteSlide from "./clubSlide/VoteSlide";
import PhotoSlide from "./clubSlide/PhotoSlide";
import { useParams } from "react-router-dom";
import { useGetClubDetail } from "@/apis/club";
import Loading from "@/components/loading/Loading";
import { useGetClubPoll } from "@/apis/poll";
const Club = () => {
  const { id } = useParams();
  const { data: clubData, isLoading: clubLoading } = useGetClubDetail(
    id as string
  );

  const { data: pollData, isLoading: pollLoading } = useGetClubPoll(
    id as string
  );

  if (!clubData || clubLoading || !pollData || pollLoading) return <Loading />;
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <ClubInfo club={clubData.data} />
        <ClubCalendar />
        <TeamSlide />
        <VoteSlide polls={pollData.data} />
        <PhotoSlide />
      </main>
    </DefaultLayout>
  );
};

export default Club;
