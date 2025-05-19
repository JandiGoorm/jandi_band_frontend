import Button from "@/components/button/Button";
import styles from "./ClubCalendar.module.css";

const ClubCalendar = () => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <p className={styles.title}>팀 일정</p>
        <Button variant="primary" size="md">
          일정 추가
        </Button>
      </header>
    </main>
  );
};

export default ClubCalendar;
