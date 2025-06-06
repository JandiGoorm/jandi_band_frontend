import styles from "./ScheduleBoard.module.css";
import { format } from "date-fns";
import { FiPlus } from "react-icons/fi";
import { dummyTeamSchedule } from "./dummyTeamSchedule";

const ScheduleBoard = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>팀 연습 일정</h2>
        <button className={styles.header_button}>
          <FiPlus size={20} />
        </button>
      </header>

      {/* 연습일정 */}
      <div className={styles.content_container}>
        {dummyTeamSchedule.map((item) => (
          <div className={styles.content_item} key={item.id}>
            <span className={styles.content_type}>
              {item.noPosition !== null ? `NO ${item.noPosition}` : "전체"}
            </span>
            <div className={styles.content_item_info}>
              <span>{item.name}</span>
              <p>{`${format(new Date(item.startDatetime), "MM월 dd일 HH:mm")} ~ ${format(new Date(item.endDatetime), "HH:mm")}`}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScheduleBoard;
