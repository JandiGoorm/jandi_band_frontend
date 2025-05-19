import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./Team.module.css";
import { dummyTeam } from "./constants";
import Button from "@/components/button/Button";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import ScheduleBoard from "./scheduleBoard/ScheduleBoard";
import QuickFilter from "./quickFilter/QuickFilter";
import TimeScheduler from "./timeScheduler/TimeScheduler";

const Team = () => {
  const [activeMember, setActiveMember] = useState<number[]>([]);

  const isActiveMember = useCallback(
    (id: number) => {
      return activeMember.includes(id);
    },
    [activeMember]
  );

  const handleActiveMember = useCallback(
    (id: number) => {
      if (isActiveMember(id)) {
        setActiveMember(activeMember.filter((member) => member !== id));
      } else {
        setActiveMember([...activeMember, id]);
      }
    },
    [isActiveMember, activeMember]
  );

  useEffect(() => {
    const membersIds = dummyTeam.members.map((member) => member.id);
    setActiveMember(membersIds);
  }, []);

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>뫄뫄 밴드부 A팀</h1>

          <div className={styles.header_button_container}>
            <Button className={styles.header_button}>곡 투표 생성</Button>
            <Button className={styles.header_button}>공유하기</Button>
          </div>
        </header>

        <section className={styles.team_members_container}>
          {dummyTeam.members.map((member) => (
            <button
              className={clsx(
                styles.team_member,
                isActiveMember(member.id) && styles.active
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
