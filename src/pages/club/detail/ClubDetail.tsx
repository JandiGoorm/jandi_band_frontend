import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./ClubDetail.module.css";
import ClubInfo from "./clubInfo/ClubInfo";
import Calendar from "./clubCalendar/calendar/Calendar";
import TeamSlide from "./clubSlide/TeamSlide";
import VoteSlide from "./clubSlide/VoteSlide";
import PhotoSlide from "./clubSlide/PhotoSlide";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  useDeleteClub,
  useGetClubDetail,
  useGetClubMembers,
  useLeaveClub,
} from "@/apis/club";
import Loading from "@/components/loading/Loading";
import { useGetClubPoll } from "@/apis/poll";
import { useGetTeamList } from "@/apis/team";
import { useAuthStore } from "@/stores/authStore";
// 클럽아이디 저장
import { useClubStore } from "@/stores/clubStore";
import LeaveModal from "@/components/modal/leaveModal/LeaveModal";
import Button from "@/components/button/Button";
import { PageEndpoints } from "@/constants/endpoints";
import DeleteModal from "@/components/modal/deleteModal/DeleteModal";
import { useGetPhotos } from "@/apis/photo";

const Club = () => {
  const { id } = useParams();
  const setClubId = useClubStore((id) => id.setClubId);
  const setClubMembers = useClubStore((state) => state.setClubMembers);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) setClubId(Number(id));
  }, [id, setClubId]);

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
    data: photoData,
    isLoading: photoLoading,
    refetch: refetchPhotos,
  } = useGetPhotos({
    id: id || "",
  });

  useEffect(() => {
    if (memberData?.data?.members) {
      setClubMembers(memberData.data.members);
    }
  }, [memberData, setClubMembers]);

  const { mutate: leaveClub } = useLeaveClub(id!);
  const { mutate: deleteClub } = useDeleteClub(id!);

  const { data: pollData, isLoading: pollLoading } = useGetClubPoll({
    id: id as string,
  });

  if (
    !clubData ||
    clubLoading ||
    !pollData ||
    pollLoading ||
    memberLoading ||
    !memberData ||
    teamLoading ||
    !photoData ||
    photoLoading
  )
    return <Loading />;

  const isMember = memberData.data.members.some(
    (member: { userId: number }) => member.userId === user?.id
  );

  const mine = user?.id === clubData.data.representativeId;

  return (
    <DefaultLayout>
      <main className={styles.container}>
        <ClubInfo
          club={clubData.data}
          memberData={memberData.data}
          isMember={isMember}
        />
        <Calendar isMember={isMember} />
        {isMember && <TeamSlide teams={teamData?.data.content} />}
        {isMember && (
          <VoteSlide polls={pollData.data.content} isMember={isMember} />
        )}
        <PhotoSlide
          isMember={isMember}
          photos={photoData.data.content}
          refetchPhotos={refetchPhotos}
        />
        {isMember && (
          <section className={styles.Management_container}>
            {mine ? (
              <DeleteModal
                trigger={
                  <Button size="md" variant="primary">
                    동아리 삭제
                  </Button>
                }
                title="동아리 삭제"
                description="정말 해당 동아리를 삭제 하시겠어요?"
                onDelete={() => {
                  deleteClub(undefined, {
                    onSuccess: () => {
                      navigate(PageEndpoints.HOME);
                    },
                  });
                }}
              />
            ) : (
              <LeaveModal
                trigger={
                  <Button size="md" variant="primary">
                    탈퇴
                  </Button>
                }
                title="동아리 나가기"
                description="정말 해당 동아리를 나가시겠어요?"
                onLeave={() => {
                  leaveClub(undefined, {
                    onSuccess: () => {
                      navigate(PageEndpoints.HOME);
                    },
                  });
                }}
              />
            )}
          </section>
        )}
      </main>
    </DefaultLayout>
  );
};

export default Club;
