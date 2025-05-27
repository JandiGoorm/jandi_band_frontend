import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./TeamDetail.module.css";
import { TeamProvider } from "./TeamDetailProvider";
import QuickFilter from "./quickFilter/QuickFilter";
import TimeScheduler from "@/components/scheduler/TimeScheduler";
import Button from "@/components/button/Button";
import KakaoShare from "./modals/KakaoShare";
import ScheduleBoard from "./scheduleBoard/ScheduleBoard";
import TeamMembers from "./teamMembers/TeamMembers";

const TeamDetail = () => {
  return (
    <DefaultLayout>
      <TeamProvider>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>뫄뫄 밴드부 A팀</h1>

            <div className={styles.header_button_container}>
              <Button>곡 투표 생성</Button>
              <KakaoShare />
            </div>
          </header>

          <TeamMembers />

          <section className={styles.content_container}>
            <TimeScheduler />
            <div className={styles.content_side_container}>
              <QuickFilter />
              <ScheduleBoard />
            </div>
          </section>
        </div>
      </TeamProvider>
    </DefaultLayout>
  );
};

export default TeamDetail;
