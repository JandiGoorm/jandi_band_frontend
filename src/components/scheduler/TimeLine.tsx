import { timeLineItems } from "@/utils/timetable";
import styles from "./TimeLine.module.css";

const TimeLine = () => {
  return (
    <div className={styles.container}>
      {timeLineItems.map((item) => (
        <div key={item} className={styles.time_line_item}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default TimeLine;
