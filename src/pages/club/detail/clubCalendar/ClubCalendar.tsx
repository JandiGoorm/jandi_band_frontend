import styles from "./ClubCalendar.module.css";
import Calendar from "./calendar/Calendar";

const ClubCalendar = () => {
  return (
    <main className={styles.container}>
      <Calendar isMember />
    </main>
  );
};

export default ClubCalendar;
