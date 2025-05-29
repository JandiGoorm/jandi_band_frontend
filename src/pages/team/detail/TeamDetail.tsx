import TimeScheduler from "@/components/scheduler/TimeScheduler";
import { useNavigate } from "react-router-dom";
import styles from "./TeamDetail.module.css";
import { useTeamDetail } from "./TeamDetailProvider";
import KakaoShare from "./modals/KakaoShare";
import QuickFilter from "./quickFilter/QuickFilter";
import ScheduleBoard from "./scheduleBoard/ScheduleBoard";
import TeamMembers from "./teamMembers/TeamMembers";
import Button from "@/components/button/Button";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";

const TeamDetail = () => {
  const navigate = useNavigate();
  const { teamTimeAvailableSchedule, teamId } = useTeamDetail();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>뫄뫄 밴드부 A팀</h1>

        <div className={styles.header_button_container}>
          <Button
            variant="primary"
            onClick={() =>
              navigate(
                buildPath(PageEndpoints.POST_TEAM_TIMETABLE, { id: teamId })
              )
            }
          >
            내 시간표 입력
          </Button>
          <KakaoShare />
        </div>
      </header>

      <TeamMembers />

      <section className={styles.content_container}>
        <TimeScheduler initialTimeSchedule={teamTimeAvailableSchedule} />
        <div className={styles.content_side_container}>
          <QuickFilter />
          <ScheduleBoard />
        </div>
      </section>
    </div>
  );
};

export default TeamDetail;
