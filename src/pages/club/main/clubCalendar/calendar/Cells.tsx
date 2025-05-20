import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import styles from "./Cells.module.css";

interface Props {
  currentMonth: Date;
}

const Cells = ({ currentMonth }: Props) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const today = new Date();

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  let num = 0;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "yyyy-MM-dd");
      num++;

      const isCurrentMonth = format(currentMonth, "M") === format(day, "M");
      const isToday = format(today, "yyyy-MM-dd") === formattedDate;

      days.push(
        <div
          key={num}
          className={`${styles.day_cell} ${!isCurrentMonth ? styles.not_current_month : styles.current_month} ${isToday ? styles.today_cell : ""}`}
        >
          <span
            className={`${styles.day_number} ${isToday ? styles.today : ""}`}
          >
            {isCurrentMonth ? format(day, "d") : ""}
          </span>
        </div>
      );

      day = addDays(day, 1);
    }

    rows.push(
      <div className={styles.week_row} key={num}>
        {days}
      </div>
    );
    days = [];
  }

  return <div className={styles.calendar_wrapper}>{rows}</div>;
};

export default Cells;
