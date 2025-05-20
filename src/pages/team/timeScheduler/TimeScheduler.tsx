import styles from "./TimeScheduler.module.css";
import { range, timeRange, availableTimeSlots } from "../constants";
import TimeLine from "./TimeLine";
import TimeBoard from "./TimeBoard";
import clsx from "clsx";
import LoadSchedules from "../modals/LoadSchedules";

const TimeScheduler = () => {
  const { startTime, endTime } = timeRange;

  const timeLineItems = Array.from(
    { length: endTime - startTime + 1 },
    (_, index) => (startTime + index).toString().padStart(2, "0")
  );

  return (
    <section className={styles.container}>
      <div className={styles.table_header}>
        {range.map((item) => (
          <span
            key={item}
            className={clsx(
              styles.range_item,
              item === "Sat" && styles.saturday,
              item === "Sun" && styles.sunday
            )}
          >
            {item}
          </span>
        ))}
      </div>

      <div className={styles.content_container}>
        <TimeLine timeLineItems={timeLineItems} />
        <TimeBoard
          timeLineItems={timeLineItems}
          availableTimeSlots={availableTimeSlots}
        />
      </div>

      <LoadSchedules />
    </section>
  );
};

export default TimeScheduler;
