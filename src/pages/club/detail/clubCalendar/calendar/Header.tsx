import Button from "@/components/button/Button";
import styles from "./Header.module.css";
import { useCalendarNavigation } from "@/hooks/useCalendarNavigation";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

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
        <Button size="sm" variant="none" onClick={handlePrev}>
          <MdNavigateBefore size={14} />
        </Button>
        <Button
          size="sm"
          variant="none"
          className={styles.today_button}
          onClick={handleToday}
        >
          오늘
        </Button>
        <Button size="sm" variant="none" onClick={handleNext}>
          <MdNavigateNext size={14} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
