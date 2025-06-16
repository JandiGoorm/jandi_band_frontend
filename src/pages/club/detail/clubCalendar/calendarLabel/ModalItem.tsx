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

const positionLabelMap: Record<string, string> = {
  NONE: "전체참여",
  VOCAL: "보컬제외",
  GUITAR: "기타제외",
  KEYBOARD: "키보드제외",
  BASS: "베이스제외",
  DRUM: "드럼제외",
};

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
      {event.eventType === "TEAM_EVENT" && (
        <div className={styles.team_info}>
          {event.teamName && (
            <span className={styles.team_label}>
              <span className={styles.team_keyword}>TEAM</span> {event.teamName}
            </span>
          )}
          {event.noPosition && (
            <span className={styles.position_label}>
              {positionLabelMap[event.noPosition] ?? `NO ${event.noPosition}`}
            </span>
          )}
        </div>
      )}
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
      <div className={styles.schedule_time}>
        {format(new Date(event.startDatetime), "a h시 mm분")} ~{" "}
        {format(new Date(event.endDatetime), "h시 mm분")}
      </div>
    </main>
  );
};

export default ModalItem;
