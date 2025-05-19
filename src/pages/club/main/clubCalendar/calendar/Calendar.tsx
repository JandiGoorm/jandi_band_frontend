import { useState } from "react";
import styles from "./Calendar.module.css";
import Cells from "./Cells";
import Days from "./Days";
import Header from "./Header";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const goToday = () => setCurrentMonth(new Date());

  const onChangeYear = (year: number) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
  };

  const onChangeMonth = (month: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(month - 1);
    setCurrentMonth(newDate);
  };
  return (
    <div className={styles.container}>
      <Header
        currentMonth={currentMonth}
        goToday={goToday}
        onChangeYear={onChangeYear}
        onChangeMonth={onChangeMonth}
      />
      <Days />
      <Cells currentMonth={currentMonth} />
    </div>
  );
};

export default Calendar;
