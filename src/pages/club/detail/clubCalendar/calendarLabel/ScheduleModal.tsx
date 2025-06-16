// 일정 라벨의 모달
import { useEffect, useState } from "react";
import styles from "./ScheduleModal.module.css";
import type { CalendarEvent } from "@/types/calendar";
import ModalItem from "./ModalItem";

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
  const [sechedulesState, setScheduleState] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    setScheduleState(schedules); //props로 받은 스케줄
  }, [schedules]);

  if (!isOpen) return null;

  const handleDeleteState = (id: number) => {
    setScheduleState((prev) => prev.filter((event) => event.id !== id));
  };

  const formattedDate =
    selectedDate != null
      ? new Date(selectedDate).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        })
      : "";

  return (
    <main className={styles.modal_overlay} onClick={onClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.modal_header}>
          <h2>{formattedDate}</h2>
          <button className={styles.close_button} onClick={onClose}>
            닫기
          </button>
        </header>

        {schedules.length === 0 ? (
          <p className={styles.schedule_empty}>등록된 일정이 없습니다.</p>
        ) : (
          sechedulesState.map((s, i) => (
            <ModalItem key={i} event={s} onDelete={handleDeleteState} />
          ))
        )}
      </div>
    </main>
  );
};

export default ScheduleModal;
