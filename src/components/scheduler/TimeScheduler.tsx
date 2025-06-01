import type { Range } from "@/types/timeTable";
import clsx from "clsx";
import LoadSchedules from "../../pages/team/detail/modals/LoadSchedules";
import { range } from "./constants";
import { SelectableArea, SelectableAreaController } from "./SelectableArea";
import SubController from "./SubController";
import TimeBoard from "./TimeBoard";
import TimeLine from "./TimeLine";
import styles from "./TimeScheduler.module.css";

interface TimeSchedulerProps {
  isEditable?: boolean;
  isLoad?: boolean;
  onTimeScheduleChange?: (timeSchedule: Map<string, boolean>) => void;
  initialTimeSchedule?: Record<Range, string[]>;
}

const TimeScheduler = ({
  isEditable = false,
  isLoad = false,
  onTimeScheduleChange,
  initialTimeSchedule,
}: TimeSchedulerProps) => {
  return (
    <SelectableArea onChange={onTimeScheduleChange} disabled={!isEditable}>
      <section className={styles.container}>
        <SelectableAreaController>
          {({ toggle, disabled }) => (
            <SubController onChange={toggle} disabled={disabled} />
          )}
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
          <TimeLine />
          <TimeBoard
            isEditable={isEditable}
            initialTimeSchedule={initialTimeSchedule}
          />
        </div>

        {isLoad && <LoadSchedules />}
      </section>
    </SelectableArea>
  );
};

export default TimeScheduler;
