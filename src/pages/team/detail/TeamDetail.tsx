import TimeScheduler from "@/components/scheduler/TimeScheduler";
import { useParams } from "react-router-dom";
import styles from "./TeamDetail.module.css";
import { TeamDetailProvider, useTeam } from "./TeamDetailProvider";
import KakaoShare from "./modals/KakaoShare";
import MyTimeTables from "./modals/MyTimeTables";
import QuickFilter from "./quickFilter/QuickFilter";
import ScheduleBoard from "./scheduleBoard/ScheduleBoard";
import TeamMembers from "./teamMembers/TeamMembers";

const TeamDetail = () => {
  const { id } = useParams();
  const { teamTimeAvailableSchedule } = useTeam();

  return (
    <TeamDetailProvider>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>뫄뫄 밴드부 A팀</h1>

          <div className={styles.header_button_container}>
            <MyTimeTables id={id ?? ""} />
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
    </TeamDetailProvider>
  );
};

export default TeamDetail;
