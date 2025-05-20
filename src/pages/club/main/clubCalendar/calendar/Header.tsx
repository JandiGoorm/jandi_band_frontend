import styles from "./Header.module.css";
import { useCalendarNavigation } from "@/hooks/uesCalendarNavigation";

type Props = {
  currentMonth: Date;
  goToday: () => void;
  onChangeDate: (year: number, month: number) => void;
};

const Header = ({ currentMonth, goToday, onChangeDate }: Props) => {
  const { selectedYear, selectedMonth, handleToday, handlePrev, handleNext } =
    useCalendarNavigation(currentMonth, goToday, onChangeDate);

  return (
    <div className={styles.header}>
      <div className={styles.date_text}>
        {selectedYear} {selectedMonth}
      </div>
      <div className={styles.nav_box}>
        <button onClick={handlePrev}>{"<"}</button>
        <button className={styles.today_button} onClick={handleToday}>
          오늘
        </button>
        <button onClick={handleNext}>{">"}</button>
      </div>
    </div>
  );
};

export default Header;
