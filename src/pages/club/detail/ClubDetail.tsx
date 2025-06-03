import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./ClubDetail.module.css";
import ClubInfo from "./clubInfo/ClubInfo";
import Calendar from "./clubCalendar/calendar/Calendar";
import TeamSlide from "./clubSlide/TeamSlide";
import VoteSlide from "./clubSlide/VoteSlide";
// import PhotoSlide from "./clubSlide/PhotoSlide";
import { useParams } from "react-router-dom";
import { useGetClubDetail, useGetClubMembers } from "@/apis/club";
import Loading from "@/components/loading/Loading";
import { useGetClubPoll } from "@/apis/poll";
import { useGetTeamList } from "@/apis/team";
import { useAuthStore } from "@/stores/authStore";

const Club = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { data: clubData, isLoading: clubLoading } = useGetClubDetail(
    id as string
  );
  const { data: memberData, isLoading: memberLoading } = useGetClubMembers(
    id as string
  );
  const { data: teamData, isLoading: teamLoading } = useGetTeamList(
    id as string
  );

  const {
    data: pollData,
    isLoading: pollLoading,
    refetch,
  } = useGetClubPoll({
    id: id as string,
  });

  if (
    !clubData ||
    clubLoading ||
    !pollData ||
    pollLoading ||
    memberLoading ||
    !memberData ||
    teamLoading
  )
    return <Loading />;

  const isMember = memberData.data.members.some(
    (member: { userId: number }) => member.userId === user?.id
  );

  return (
    <DefaultLayout>
      <main className={styles.container}>
        <ClubInfo club={clubData.data} memberData={memberData.data} />
        <Calendar isMember={isMember} />
        {isMember && <TeamSlide teams={teamData?.data.content} />}
        <VoteSlide
          polls={pollData.data.content}
          isMember={isMember}
          refetch={refetch}
        />
        {/* <PhotoSlide isMember={isMember} /> */}
      </main>
    </DefaultLayout>
  );
};

export default Club;
