import styles from "./Days.module.css";

const Days = () => {
  const date = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div className={styles.daysWrapper}>
      {date.map((day: string) => (
        <div className={styles.dayItem} key={day}>
          <div className={styles.dayText}>{day}</div>
        </div>
      ))}
    </div>
  );
};

export default Days;
