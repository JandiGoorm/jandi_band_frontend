import { useDeleteTeamSchedule } from "@/apis/calendar";
import { useTeamStore } from "@/stores/teamStore";
import styles from "./ScheduleBoard.module.css";

import { ApiEndpotins } from "@/constants/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import { buildPath } from "@/utils/buildPath";

const size = 10;
const page = 0;

export const DeleteButton = ({ scheduleId }: { scheduleId: number }) => {
  const teamId = useTeamStore((state) => state.teamId);
  const { mutate: deleteEvent } = useDeleteTeamSchedule(teamId!, scheduleId);
  const queryClient = useQueryClient();

  const handleDelete = () => {
    deleteEvent(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            buildPath(ApiEndpotins.TEAM_SCHEDULES, { teamId: teamId! }),
            { page, size },
          ] as const,
        });
      },
    });
  };

  return (
    <button
      className={styles.delete_btn}
      onClick={handleDelete}
      aria-label="삭제"
    >
      ✕
    </button>
  );
};
