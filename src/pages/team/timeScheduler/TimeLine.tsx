import styles from "./TimeLine.module.css";

interface TimeLineProps {
  timeLineItems: string[];
}

const TimeLine = ({ timeLineItems }: TimeLineProps) => {
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
