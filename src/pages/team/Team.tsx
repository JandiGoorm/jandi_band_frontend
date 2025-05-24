import Button from "@/components/button/Button";
import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import clsx from "clsx";
import TimeScheduler from "../../components/scheduler/TimeScheduler";
import styles from "./Team.module.css";
import { dummyTeam } from "./constants";
import KakaoShare from "./modals/KakaoShare";
import QuickFilter from "./quickFilter/QuickFilter";
import ScheduleBoard from "./scheduleBoard/ScheduleBoard";
import { useTeamStore } from "./teamStore";
import useTeamController from "./useTeamController";

const Team = () => {
  const { activeIds } = useTeamStore();
  const { handleActiveMember } = useTeamController();

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>뫄뫄 밴드부 A팀</h1>

          <div className={styles.header_button_container}>
            <Button>곡 투표 생성</Button>
            <KakaoShare />
          </div>
        </header>

        <section className={styles.team_members_container}>
          {dummyTeam.members.map((member) => (
            <button
              className={clsx(
                styles.team_member,
                activeIds.includes(member.id) && styles.active
              )}
              key={`member_${member.id}`}
              onClick={() => handleActiveMember(member.id)}
            >
              <span className={styles.team_member_info}>{member.position}</span>
              <span className={styles.team_member_name}>{member.name}</span>
            </button>
          ))}
        </section>

        <section className={styles.content_container}>
          <TimeScheduler />
          <div className={styles.content_side_container}>
            <QuickFilter />
            <ScheduleBoard />
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default Team;
