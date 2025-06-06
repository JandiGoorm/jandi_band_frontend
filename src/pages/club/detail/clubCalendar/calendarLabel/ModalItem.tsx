// ScheduleModal에 들어가는 스케줄 아이템들 (invalidate쿼리를 위해 따로 분리함)
import { format } from "date-fns";
import type { CalendarEvent } from "@/types/calendar";
import { useDeleteCalendarEvent } from "@/apis/calendar";
import styles from "./ScheduleModal.module.css";
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
          🗑️ 삭제하기
        </button>
      )}
    </div>
  );
};

export default ModalItem;
