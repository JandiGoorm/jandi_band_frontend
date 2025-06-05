import { format } from "date-fns";
import styles from "./ScheduleModal.module.css";
import type { CalendarEvent } from "@/types/calendar";

interface ScheduleModalProps {
  isOpen: boolean;
  schedules: CalendarEvent[];
  selectedDate: string | null;
  onClose: () => void;
}

const ScheduleModal = ({
  isOpen,
  schedules,
  selectedDate,
  onClose,
}: ScheduleModalProps) => {
  if (!isOpen) return null;

  console.log(schedules);

  const formatTimeRange = (start: string, end: string) => {
    return `${format(new Date(start), "HH:mm")} ~ ${format(new Date(end), "HH:mm")}`;
  };

  return (
    <main className={styles.modal_overlay} onClick={onClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.modal_header}>
          <h3>{selectedDate} 일정</h3>
          <button onClick={onClose}>닫기</button>
        </header>

        {schedules.length === 0 ? (
          <p>등록된 일정이 없습니다.</p>
        ) : (
          schedules.map((s, i) => (
            <div
              key={i}
              className={styles.schedule_label}
              style={{
                backgroundColor:
                  s.eventType === "CLUB_EVENT" ? "lightblue" : "pink",
              }}
            >
              <div>{s.name}</div>
              {s.eventType === "TEAM_EVENT" && (
                <>
                  {s.teamName && (
                    <span className={styles.team_label}>
                      [ 팀 : {s.teamName} ]{" "}
                    </span>
                  )}
                  {s.noPosition && (
                    <span className={styles.position_label}>
                      [NO {s.noPosition}]{" "}
                    </span>
                  )}
                </>
              )}
              <div className={styles.schedule_time}>
                🕒 [ {formatTimeRange(s.startDatetime, s.endDatetime)} ]
              </div>

              {s.eventType === "CLUB_EVENT" && (
                <>
                  <button>🗑️ 삭제하기</button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default ScheduleModal;
