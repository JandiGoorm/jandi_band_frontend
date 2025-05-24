import styles from "./TimeScheduler.module.css";
import { timeRange, range } from "./constants";
import { type Range } from "@/types/timeTable";
import TimeLine from "./TimeLine";
import TimeBoard from "./TimeBoard";
import clsx from "clsx";
import LoadSchedules from "../../pages/team/modals/LoadSchedules";
import { type SetState } from "@/types/common";
import SubController from "./SubController";

interface TimeSchedulerProps {
  isEditable?: boolean;
  availableTimeSlots: Record<Range, string[]>;
  setAvailableTimeSlots?: SetState<Record<Range, string[]>>;
  onTimeSlotChange?: (range: Range, time: string) => void;
}

const TimeScheduler = ({
  isEditable = false,
  availableTimeSlots,
  setAvailableTimeSlots,
  onTimeSlotChange,
}: TimeSchedulerProps) => {
  const { startTime, endTime } = timeRange;

  const timeLineItems = Array.from(
    { length: endTime - startTime + 1 },
    (_, index) => (startTime + index).toString().padStart(2, "0")
  );

  return (
    <section className={styles.container}>
      <SubController setAvailableTimeSlots={setAvailableTimeSlots} />

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
          isEditable={isEditable}
          onTimeSlotChange={onTimeSlotChange}
        />
      </div>

      {!isEditable && <LoadSchedules />}
    </section>
  );
};

export default TimeScheduler;
