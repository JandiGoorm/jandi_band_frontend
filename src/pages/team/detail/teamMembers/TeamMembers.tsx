import clsx from "clsx";
import { useTeam, useTeamController } from "../TeamDetailProvider";
import styles from "./TeamMembers.module.css";

const TeamMembers = () => {
  const { activeIds, team } = useTeam();
  const { handleActiveMember } = useTeamController();

  return (
    <section className={styles.team_members_container}>
      {team?.members.map((member) => (
        <button
          className={clsx(
            styles.team_member,
            activeIds.includes(member.userId) && styles.active
          )}
          key={`member_${member.userId}`}
          onClick={() => handleActiveMember(member.userId)}
        >
          <span className={styles.team_member_info}>{member.position}</span>
          <span className={styles.team_member_name}>{member.name}</span>
        </button>
      ))}
    </section>
  );
};

export default TeamMembers;
