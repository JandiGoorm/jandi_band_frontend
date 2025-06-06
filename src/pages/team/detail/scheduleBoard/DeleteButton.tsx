import { useDeleteTeamSchedule } from "@/apis/calendar";
import { useTeamStore } from "@/stores/teamStore";
import styles from "./ScheduleBoard.module.css";

export const DeleteButton = ({ scheduleId }: { scheduleId: number }) => {
  const teamId = useTeamStore((state) => state.teamId);
  const { mutate: deleteEvent } = useDeleteTeamSchedule(teamId!, scheduleId);

  const handleDelete = () => {
    deleteEvent(undefined, {
      onSuccess: () => {
        console.log("삭제 완료");
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
