import { useState } from "react";

export const useCalendarNavigation = (
  currentMonth: Date,
  goToday: () => void,
  onChangeDate: (year: number, month: number) => void
) => {
  const currentYear = currentMonth.getFullYear();
  const currentMonthIndex = currentMonth.getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(`${currentYear}년`);
  const [selectedMonth, setSelectedMonth] = useState(`${currentMonthIndex}월`);

  const handleToday = () => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;

    setSelectedYear(`${todayYear}년`);
    setSelectedMonth(`${todayMonth}월`);
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

  return {
    selectedYear,
    selectedMonth,
    handleToday,
    handlePrev,
    handleNext,
  };
};
