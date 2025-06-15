import { useMemo, type HTMLAttributes } from "react";
import styles from "./TimeTableCards.module.css";
import type { TimeTableResponse } from "@/types/timeTable";
import clsx from "clsx";

interface TimeTableCardsProps extends HTMLAttributes<HTMLDivElement> {
  timeTable: TimeTableResponse;
}

const TimeTableCards = ({ timeTable, ...props }: TimeTableCardsProps) => {
  const activeIndices = useMemo(() => {
    const indices = Array.from({ length: 25 }, (_, i) => i);
    const shuffled = indices.sort(() => Math.random() - 0.5);
    return new Set(shuffled.slice(0, 10));
  }, []);

  console.log(timeTable);

  return (
    <section className={styles.container} {...props}>
      <h3 className={styles.title}>{timeTable.name}</h3>

      <div className={styles.time_table_ui}>
        {Array.from({ length: 25 }).map((_, index) => (
          <div
            key={index}
            className={clsx(activeIndices.has(index) && styles.active)}
          />
        ))}
      </div>
    </section>
  );
};

export default TimeTableCards;
