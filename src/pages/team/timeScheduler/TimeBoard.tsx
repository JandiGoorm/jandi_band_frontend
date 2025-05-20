import clsx from "clsx";
import { range, type Range } from "../constants";
import styles from "./TimeBoard.module.css";

interface TimeBoardProps {
  timeLineItems: string[];
  availableTimeSlots: Record<Range, string[]>;
}

const TimeBoard = ({ timeLineItems, availableTimeSlots }: TimeBoardProps) => {
  const isAvailableTime = (day: Range, time: string) => {
    const daySlots = availableTimeSlots[day];
    if (!daySlots) return { isFirstHalf: false, isSecondHalf: false };

    const timeSlots = {
      isFirstHalf: daySlots.includes(`${time}:00`),
      isSecondHalf: daySlots.includes(`${time}:30`),
    };

    return timeSlots;
  };

  return (
    <div className={styles.container}>
      {range.map((day) => {
        return (
          <div key={day} className={styles.time_board_item}>
            {timeLineItems.map((time) => {
              const { isFirstHalf, isSecondHalf } = isAvailableTime(day, time);
              return (
                <div key={time} className={styles.time_board_item_range}>
                  <div
                    className={clsx(
                      styles.time_board_item_range_first_half,
                      isFirstHalf && styles.active
                    )}
                  ></div>
                  <div
                    className={clsx(
                      styles.time_board_item_range_second_half,
                      isSecondHalf && styles.active
                    )}
                  ></div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TimeBoard;
