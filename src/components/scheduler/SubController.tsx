import styles from "./SubController.module.css";
import { type SetState } from "@/types/common";
import { range } from "./constants";
import { type Range } from "@/types/timeTable";
import { useCallback } from "react";
import * as Switch from "@radix-ui/react-switch";

interface SubControllerProps {
  setAvailableTimeSlots?: SetState<Record<Range, string[]>>;
}

const SubController = ({ setAvailableTimeSlots }: SubControllerProps) => {
  // 시간 전부 가능하게 설정
  const handleAllAvailable = useCallback(() => {
    if (!setAvailableTimeSlots) return;
    const timeSlots: string[] = [];
    for (let hour = 7; hour <= 23; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
      timeSlots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    timeSlots.push("23:30");

    const schedule = range.reduce(
      (acc, day) => {
        acc[day] = timeSlots;
        return acc;
      },
      {} as Record<Range, string[]>
    );

    setAvailableTimeSlots(schedule);
  }, [setAvailableTimeSlots]);

  // 시간 전부 불가능하게 설정
  const handleAllUnavailable = useCallback(() => {
    if (!setAvailableTimeSlots) return;
    const schedule = range.reduce(
      (acc, day) => {
        acc[day] = [];
        return acc;
      },
      {} as Record<Range, string[]>
    );

    setAvailableTimeSlots(schedule);
  }, [setAvailableTimeSlots]);

  return (
    <section className={styles.container}>
      <div className={styles.switch_container}>
        {setAvailableTimeSlots && (
          <Switch.Root
            className={styles.switch_root}
            onCheckedChange={(checked) => {
              if (checked) {
                handleAllAvailable();
              } else {
                handleAllUnavailable();
              }
            }}
          >
            <Switch.Thumb className={styles.switch_thumb} />
          </Switch.Root>
        )}
        <span>전체 선택</span>
      </div>

      <div className={styles.sub_container}>
        <div className={styles.sub_item}>
          <div className={styles.available_box} />
          <p>가능</p>
        </div>

        <div className={styles.sub_item}>
          <div className={styles.unavailable_box} />
          <p>불가능</p>
        </div>
      </div>
    </section>
  );
};

export default SubController;
