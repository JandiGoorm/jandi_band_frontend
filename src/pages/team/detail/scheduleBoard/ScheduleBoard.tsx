// import { useState } from "react";
import styles from "./ScheduleBoard.module.css";
import { format } from "date-fns";
import { FiPlus } from "react-icons/fi";
import Modal from "@/components/modal/Modal";
import { dummyTeamSchedule } from "./dummyTeamSchedule";
import AddPractice from "./AddPractice";
// import { useGetTeamSchedules } from "@/apis/calendar"
// import { useTeamStore } from "@/stores/teamStore";

// const size = 10;

const ScheduleBoard = () => {
  // const teamId = useTeamStore((state) => state.teamId);
  // const [page, setPage] = useState(0);
  // const { data } = useGetTeamSchedules(teamId!, page, size);

  // const schedules = data?.data.content ?? [];
  // const pageInfo = data?.data.pageInfo;

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>팀 연습 일정</h2>
        <Modal
          title="팀 연습 일정 등록하기"
          trigger={
            <button className={styles.header_button}>
              <FiPlus size={20} />
            </button>
          }
        >
          {(setOpen) => <AddPractice setOpen={setOpen} />}
        </Modal>
      </header>

      {/* 연습일정 */}
      <div className={styles.content_container}>
        {dummyTeamSchedule.map((item) => (
          <div className={styles.content_item} key={item.id}>
            <span className={styles.content_type}>
              {item.noPosition !== null ? `NO ${item.noPosition}` : "전체"}
            </span>
            <div className={styles.content_item_info}>
              <span>{item.name}</span>
              <p>{`${format(new Date(item.startDatetime), "MM월 dd일 HH:mm")} ~ ${format(new Date(item.endDatetime), "HH:mm")}`}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScheduleBoard;
