import { useState } from "react";
import styles from "./Header.module.css";

type Props = {
  currentMonth: Date;
  goToday: () => void;
  onChangeDate: (year: number, month: number) => void;
};

const Header = ({ currentMonth, goToday, onChangeDate }: Props) => {
  const currentYear = currentMonth.getFullYear();
  const currentMonthIndex = currentMonth.getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(`${currentYear}년`);
  const [selectedMonth, setSelectedMonth] = useState(`${currentMonthIndex}월`);

  const handleToday = () => {
    const today = new Date();
    const todayYear = `${today.getFullYear()}년`;
    const todayMonth = `${today.getMonth() + 1}월`;

    setSelectedYear(todayYear);
    setSelectedMonth(todayMonth);
    goToday();
  };

  const handlePrev = () => {
    let newYear = currentYear;
    let newMonth = currentMonthIndex - 1;

    if (newMonth <= 0) {
      newMonth = 12;
      newYear -= 1;
    }

    setSelectedYear(`${newYear}년`);
    setSelectedMonth(`${newMonth}월`);
    onChangeDate(newYear, newMonth);
  };

  const handleNext = () => {
    let newYear = currentYear;
    let newMonth = currentMonthIndex + 1;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    setSelectedYear(`${newYear}년`);
    setSelectedMonth(`${newMonth}월`);
    onChangeDate(newYear, newMonth);
  };

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
