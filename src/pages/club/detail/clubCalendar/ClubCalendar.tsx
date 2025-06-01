import Button from "@/components/button/Button";
import styles from "./ClubCalendar.module.css";
import Calendar from "./calendar/Calendar";
import Modal from "@/components/modal/Modal";
import ScheduleModal from "./ScheduleModal";

const ClubCalendar = ({ isMember }: { isMember: boolean }) => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        {isMember && (
          <Modal
            title="일정 추가하기"
            trigger={
              <Button variant="primary" size="md">
                일정 등록
              </Button>
            }
          >
            <ScheduleModal />
          </Modal>
        )}
      </header>
      <Calendar />
    </main>
  );
};

export default ClubCalendar;
