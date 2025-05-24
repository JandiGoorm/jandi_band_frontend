import styles from "./Days.module.css";

const Days = () => {
  const date = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div className={styles.days_wrapper}>
      {date.map((day: string) => (
        <div className={styles.day_item} key={day}>
          <div className={styles.day_text}>{day}</div>
        </div>
      ))}
    </div>
  );
};

export default Days;
