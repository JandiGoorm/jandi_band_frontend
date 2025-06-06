import { format } from "date-fns";
import type { CalendarEvent } from "@/types/calendar";
import { useDeleteCalendarEvent } from "@/apis/calendar";
import styles from "./ScheduleModal.module.css";
import { useClubStore } from "@/stores/clubStore";

interface ScheduleItemProps {
  event: CalendarEvent;
}

const ModalItem = ({ event }: ScheduleItemProps) => {
  const clubId = useClubStore((state) => state.clubId);
  const { mutate: deleteEvent } = useDeleteCalendarEvent(clubId!, event.id);

  const formatTimeRange = (start: string, end: string) => {
    return `${format(new Date(start), "HH:mm")} ~ ${format(new Date(end), "HH:mm")}`;
  };

  return (
    <div
      className={styles.schedule_label}
      style={{
        backgroundColor:
          event.eventType === "CLUB_EVENT" ? "lightblue" : "pink",
      }}
    >
      <div>{event.name}</div>

      {event.eventType === "TEAM_EVENT" && (
        <>
          {event.teamName && (
            <span className={styles.team_label}>[ 팀 : {event.teamName} ]</span>
          )}
          {event.noPosition && (
            <span className={styles.position_label}>
              [NO {event.noPosition}]
            </span>
          )}
        </>
      )}

      <div className={styles.schedule_time}>
        🕒 [ {formatTimeRange(event.startDatetime, event.endDatetime)} ]
      </div>

      {event.eventType === "CLUB_EVENT" && (
        <button
          onClick={() => {
            if (confirm("정말 삭제하시겠습니까?")) {
              deleteEvent();
            }
          }}
        >
          🗑️ 삭제하기
        </button>
      )}
    </div>
  );
};

export default ModalItem;
