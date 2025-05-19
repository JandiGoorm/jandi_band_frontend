import Button from "@/components/button/Button";
import styles from "./ClubCalendar.module.css";
import Calendar from "./calendar/Calendar";

const ClubCalendar = () => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Button variant="primary" size="md">
          일정 추가
        </Button>
      </header>
      <Calendar />
    </main>
  );
};

export default ClubCalendar;
