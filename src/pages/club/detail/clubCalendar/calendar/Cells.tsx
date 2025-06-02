import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import styles from "./Cells.module.css";
import clsx from "clsx";

// currentMonth 현재 달 (=기준)
interface Props {
  currentMonth: Date;
}

const Cells = ({ currentMonth }: Props) => {
  const monthStart = startOfMonth(currentMonth); // 전달받은 월의 1일
  const monthEnd = endOfMonth(monthStart); // 해당 월의 마지막날
  const startDate = startOfWeek(monthStart); // 달력에서의 시작 (일))
  const endDate = endOfWeek(monthEnd); // 달력에서의 끝 (토)
  const today = new Date();

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  let num = 0;

  // 날짜 셀 반복 생성
  while (day <= endDate) {
    // 한 주의 칸 만들기
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "yyyy-MM-dd"); // 현재 day 문자열로 반환
      num++; // 셀에 고유한 키

      // 해당 날짜가 이번 달인가?
      const isCurrentMonth = format(currentMonth, "M") === format(day, "M");
      const isToday = format(today, "yyyy-MM-dd") === formattedDate; // 해당 날짜가 오늘인가?

      // 하나의 날짜 셀
      days.push(
        <div
          key={num} // 고유 키
          className={clsx(styles.day_cell, {
            [styles.not_current_month]: !isCurrentMonth,
            [styles.current_month]: isCurrentMonth,
            [styles.today_cell]: isToday,
          })}
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

    // 한 주를 push 하는건가
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
