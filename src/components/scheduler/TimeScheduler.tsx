import clsx from "clsx";
import LoadSchedules from "../../pages/team/modals/LoadSchedules";
import { range, timeRange } from "./constants";
import { SelectableArea, SelectableAreaController } from "./SelectableArea";
import SubController from "./SubController";
import TimeBoard from "./TimeBoard";
import TimeLine from "./TimeLine";
import styles from "./TimeScheduler.module.css";

interface TimeSchedulerProps {
  isEditable?: boolean;
  onTimeScheduleChange?: (timeSchedule: Map<string, boolean>) => void;
}

const TimeScheduler = ({
  isEditable = false,
  onTimeScheduleChange,
}: TimeSchedulerProps) => {
  const { startTime, endTime } = timeRange;

  const timeLineItems = Array.from(
    { length: endTime - startTime + 1 },
    (_, index) => (startTime + index).toString().padStart(2, "0")
  );

  return (
    <SelectableArea onChange={onTimeScheduleChange} disabled={!isEditable}>
      <section className={styles.container}>
        <SelectableAreaController>
          {({ toggle }) => <SubController onChange={toggle} />}
        </SelectableAreaController>

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
          <TimeBoard timeLineItems={timeLineItems} isEditable={isEditable} />
        </div>

        {!isEditable && <LoadSchedules />}
      </section>
    </SelectableArea>
  );
};

export default TimeScheduler;
