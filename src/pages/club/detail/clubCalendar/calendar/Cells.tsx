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
import { useState } from "react";

// 일정 라벨 만들기
import { useGetCalendar } from "@/apis/calendar";
import type { CalendarEvent, EventType } from "@/types/calendar";
import ScheduleModal from "@/pages/club/detail/clubCalendar/calendarLabel/ScheduleModal";
import useMediaQuery from "@/pages/club/detail/clubCalendar/calendarLabel/useMediaQuery";
import { useClubStore } from "@/stores/clubStore";

// currentMonth 현재 달 (=기준)
interface Props {
  currentMonth: Date;
}

// 임의의 색상 지정해두려고
const eventTypeColors: Record<EventType, string> = {
  CLUB_EVENT: "lightblue",
  TEAM_EVENT: "pink",
};
const getColorByEventType = (type: EventType) => eventTypeColors[type];

const Cells = ({ currentMonth }: Props) => {
  const monthStart = startOfMonth(currentMonth); // 전달받은 월의 1일
  const monthEnd = endOfMonth(monthStart); // 해당 월의 마지막날
  const startDate = startOfWeek(monthStart); // 달력에서의 시작 (일))
  const endDate = endOfWeek(monthEnd); // 달력에서의 끝 (토)
  const today = new Date();

  // api 연결을 위한 변수들
  const clubId = useClubStore((state) => state.clubId);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth() + 1;
  const { data: response } = useGetCalendar(clubId!, year, month);
  const schedules = response?.data ?? [];

  const rows = [];
  let days = [];
  let num = 0;

  const [selectedSchedules, setSelectedSchedules] = useState<CalendarEvent[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  let day = new Date(startDate);

  const isSameOrBetween = (date: string, start: string, end: string) => {
    return date >= start && date <= end;
  };

  const handleDayClick = (date: string) => {
    const matched = schedules.filter((s) => {
      const start = format(new Date(s.startDatetime), "yyyy-MM-dd");
      const end = format(new Date(s.endDatetime), "yyyy-MM-dd");
      return isSameOrBetween(date, start, end);
    });
    setSelectedSchedules(matched);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const isMobile = useMediaQuery("(max-width: 768px)");
  const maxVisible = isMobile ? 3 : 4;

  // 날짜 셀 반복 생성
  while (day <= endDate) {
    // 한 주의 칸 만들기
    for (let i = 0; i < 7; i++) {
      const thisDay = new Date(day);
      const formattedDate = format(thisDay, "yyyy-MM-dd");
      num++; // 셀에 고유한 키

      // 일정 라벨
      const matchedSchedules = schedules.filter((s) => {
        const start = format(new Date(s.startDatetime), "yyyy-MM-dd");
        const end = format(new Date(s.endDatetime), "yyyy-MM-dd");
        return isSameOrBetween(formattedDate, start, end);
      });

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
          onClick={() => handleDayClick(formattedDate)}
        >
          <span
            className={`${styles.day_number} ${isToday ? styles.today : ""}`}
          >
            {isCurrentMonth ? format(day, "d") : ""}
          </span>

          {/* 일정 목록 렌더링 */}
          {matchedSchedules.slice(0, maxVisible).map((schedule, idx) => (
            <div
              key={idx}
              className={styles.schedule_label}
              style={{
                backgroundColor: getColorByEventType(schedule.eventType),
              }}
            >
              {schedule.name}
            </div>
          ))}
          {matchedSchedules.length > maxVisible && (
            <div className={styles.schedule_label_more}>
              +{matchedSchedules.length - maxVisible}개
            </div>
          )}
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

  return (
    <div className={styles.calendar_wrapper}>
      {rows}
      <ScheduleModal
        isOpen={isModalOpen}
        schedules={selectedSchedules}
        selectedDate={selectedDate}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Cells;
