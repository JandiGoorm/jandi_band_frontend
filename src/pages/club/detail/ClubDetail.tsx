import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./ClubDetail.module.css";
import ClubInfo from "./clubInfo/ClubInfo";
import ClubCalendar from "./clubCalendar/ClubCalendar";
import TeamSlide from "./clubSlide/TeamSlide";
import VoteSlide from "./clubSlide/VoteSlide";
// import PhotoSlide from "./clubSlide/PhotoSlide";
import { useParams } from "react-router-dom";
import { useGetClubDetail, useGetClubMembers } from "@/apis/club";
import Loading from "@/components/loading/Loading";
import { useGetClubPoll } from "@/apis/poll";
import { useGetMe } from "@/apis/auth";
import { useGetTeamList } from "@/apis/team";
const Club = () => {
  const { id } = useParams();
  const { data: myData, isLoading: myLoading } = useGetMe();
  const { data: clubData, isLoading: clubLoading } = useGetClubDetail(
    id as string
  );
  const { data: memberData, isLoading: memberLoading } = useGetClubMembers(
    id as string
  );
  const { data: teamData, isLoading: teamLoading } = useGetTeamList(
    id as string
  );

  const { data: pollData, isLoading: pollLoading } = useGetClubPoll(
    id as string
  );

  if (
    !clubData ||
    clubLoading ||
    !pollData ||
    pollLoading ||
    !myData ||
    myLoading ||
    memberLoading ||
    !memberData ||
    teamLoading
  )
    return <Loading />;

  console.log(memberData.data);

  const isMember = memberData.data.members.some(
    (member: { userId: number }) => member.userId === myData.data.id
  );

  return (
    <DefaultLayout>
      <main className={styles.container}>
        <ClubInfo
          club={clubData.data}
          mydata={myData.data}
          memberData={memberData.data}
        />
        <ClubCalendar isMember={isMember} />
        {isMember ? <TeamSlide teams={teamData?.data.content} /> : null}
        <VoteSlide polls={pollData.data.content} isMember={isMember} />
        {/* <PhotoSlide isMember={isMember} /> */}
      </main>
    </DefaultLayout>
  );
};

export default Club;
