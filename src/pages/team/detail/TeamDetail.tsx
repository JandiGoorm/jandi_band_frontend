// 팀 페이지
import TimeScheduler from "@/components/scheduler/TimeScheduler";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TeamDetail.module.css";
import { useTeamDetail } from "./TeamDetailProvider";
import InviteTeam from "./modals/InviteTeam";
import QuickFilter from "./quickFilter/QuickFilter";
import ScheduleBoard from "./scheduleBoard/ScheduleBoard";
import TeamMembers from "./teamMembers/TeamMembers";
import Button from "@/components/button/Button";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";
import Loading from "@/components/loading/Loading";
import { useAuthStore } from "@/stores/authStore";
import LeaveModal from "@/components/modal/leaveModal/LeaveModal";
import { useLeaveTeam } from "@/apis/team";

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { teamTimeAvailableSchedule, teamId, team, isLoading } =
    useTeamDetail();
  const { user } = useAuthStore();
  const { mutate: leaveTeam } = useLeaveTeam(id!);

  if (isLoading) return <Loading />;
  if (!team) return <div>팀 정보를 찾을 수 없습니다.</div>;
  const isMember = team.members.some((member) => member.userId === user?.id);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{team.name}</h1>

        {isMember && (
          <div className={styles.header_button_container}>
            <Button
              variant="primary"
              onClick={() =>
                navigate(
                  buildPath(PageEndpoints.POST_TEAM_TIMETABLE, { id: teamId })
                )
              }
              size="sm"
              className={styles.header_button_mytimetable}
            >
              내 시간표 입력
            </Button>
            <InviteTeam />
          </div>
        )}
      </header>

      <TeamMembers />

      <section className={styles.content_container}>
        <TimeScheduler initialTimeSchedule={teamTimeAvailableSchedule} />
        <div className={styles.content_side_container}>
          <QuickFilter />
          <ScheduleBoard />
        </div>
      </section>

      <section className={styles.footer_button_container}>
        {isMember && (
          <LeaveModal
            trigger={
              <Button size="md" variant="primary">
                나가기
              </Button>
            }
            title="팀 나가기"
            description="정말 해당 팀을 나가시겠어요?"
            onLeave={() => {
              leaveTeam(undefined, {
                onSuccess: () => {
                  navigate(buildPath(PageEndpoints.CLUB, { id: team.clubId }));
                },
              });
            }}
          />
        )}
      </section>
    </div>
  );
};

export default TeamDetail;
