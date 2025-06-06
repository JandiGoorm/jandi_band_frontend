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
  if (!isOpen) return null;

  // console.log(schedules);

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
          schedules.map((s, i) => <ModalItem key={i} event={s} />)
        )}
      </div>
    </main>
  );
};

export default ScheduleModal;
