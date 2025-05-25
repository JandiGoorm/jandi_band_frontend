import { useState } from "react";
import styles from "./Calendar.module.css";
import Cells from "./Cells";
import Days from "./Days";
import Header from "./Header";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const goToday = () => setCurrentMonth(new Date());

  const onChangeDate = (year: number, month: number) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    newDate.setMonth(month - 1);
    setCurrentMonth(newDate);
  };

  return (
    <div className={styles.container}>
      <Header
        currentMonth={currentMonth}
        goToday={goToday}
        onChangeDate={onChangeDate}
      />
      <Days />
      <Cells currentMonth={currentMonth} />
    </div>
  );
};

export default Calendar;
