import styles from "./ScheduleBoard.module.css";
import { FiPlus } from "react-icons/fi";

const ScheduleBoard = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>팀 연습 일정</h2>
        <button className={styles.header_button}>
          <FiPlus size={20} />
        </button>
      </header>

      {/* <div className={styles.content_container}>
        {dummyTeam.practiceTime.map((time) => (
          <div className={styles.content_item} key={time.id}>
            <span className={styles.content_type}>{time.type}</span>
            <span>{time.time}</span>
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default ScheduleBoard;
