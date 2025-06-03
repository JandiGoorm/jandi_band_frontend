import { useState } from "react";
import styles from "./Calendar.module.css";
import Cells from "./Cells";
import Days from "./Days";
import Header from "./Header";
import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";
import ScheduleModal from "@/pages/club/detail/clubCalendar/ScheduleModal";

const Calendar = ({ isMember }: { isMember: boolean }) => {
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
      <section className={styles.cal_header}>
        <Header
          currentMonth={currentMonth}
          goToday={goToday}
          onChangeDate={onChangeDate}
        />
        <>
          {isMember && (
            <Modal
              title="일정 추가하기"
              trigger={
                <Button variant="primary" size="sm" className={styles.add_but}>
                  일정 등록
                </Button>
              }
            >
              <ScheduleModal />
            </Modal>
          )}
        </>
      </section>

      <Days />
      <Cells currentMonth={currentMonth} />
    </div>
  );
};

export default Calendar;
