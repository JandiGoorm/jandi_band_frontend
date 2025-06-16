// ScheduleModal에 들어가는 스케줄 아이템들 (invalidate쿼리를 위해 따로 분리함)
import { format } from "date-fns";
import type { CalendarEvent } from "@/types/calendar";
import { useDeleteCalendarEvent } from "@/apis/calendar";
import styles from "./ModalItem.module.css";
import { useClubStore } from "@/stores/clubStore";
import { useCurrentStore } from "@/stores/currentStore";

// invalidateQueries 사용해보기
import { ApiEndpotins } from "@/constants/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import { buildPath } from "@/utils/buildPath";

interface ScheduleItemProps {
  event: CalendarEvent;
  onDelete: (id: number) => void;
}

const ModalItem = ({ event, onDelete }: ScheduleItemProps) => {
  const clubId = useClubStore((state) => state.clubId);
  const currentMonth = useCurrentStore((state) => state.currentMonth);

  const { mutate: deleteEvent } = useDeleteCalendarEvent(clubId!, event.id);
  const queryClient = useQueryClient();

  return (
    <main
      className={`${styles.schedule_label} ${
        event.eventType === "CLUB_EVENT" ? styles.club_event : styles.team_event
      }`}
    >
      <div className={styles.name_delete_box}>
        <div className={styles.event_name}>{event.name}</div>

        {event.eventType === "CLUB_EVENT" && (
          <button
            className={styles.delete_button}
            onClick={() => {
              deleteEvent(undefined, {
                onSuccess: () => {
                  const year = currentMonth.getFullYear();
                  const month = currentMonth.getMonth() + 1;

                  onDelete(event.id);

                  queryClient.invalidateQueries({
                    queryKey: [
                      buildPath(ApiEndpotins.CALENDAR, { clubId: clubId! }),
                      { year, month },
                    ] as const,
                  });
                },
              });
            }}
          >
            X
          </button>
        )}
      </div>
      {event.eventType === "TEAM_EVENT" && (
        <>
          {event.teamName && (
            <span className={styles.team_label}> TEAM : {event.teamName}</span>
          )}
          {event.noPosition && (
            <span className={styles.position_label}>NO {event.noPosition}</span>
          )}
        </>
      )}
      <div className={styles.schedule_time}>
        {format(new Date(event.startDatetime), "MM월 dd일 HH:mm")} ~{" "}
        {format(new Date(event.endDatetime), "HH:mm")}
      </div>
    </main>
  );
};

export default ModalItem;
