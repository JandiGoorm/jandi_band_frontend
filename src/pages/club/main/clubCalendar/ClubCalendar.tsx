import Button from "@/components/button/Button";
import styles from "./ClubCalendar.module.css";
import Calendar from "./calendar/Calendar";
import Modal from "@/components/modal/Modal";
import ScheduleModal from "./ScheduleModal";

const ClubCalendar = () => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Modal
          title="일정 추가하기"
          trigger={
            <Button variant="primary" size="md">
              일정 추가
            </Button>
          }
        >
          <ScheduleModal />
        </Modal>
      </header>
      <Calendar />
    </main>
  );
};

export default ClubCalendar;
