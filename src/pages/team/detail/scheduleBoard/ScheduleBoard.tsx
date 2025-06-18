import { useState } from "react";
import styles from "./ScheduleBoard.module.css";
import { format } from "date-fns";
import { FiPlus } from "react-icons/fi";
import Modal from "@/components/modal/Modal";
import AddPractice from "./AddPractice";
import { useGetTeamSchedules } from "@/apis/calendar";
import { useTeamStore } from "@/stores/teamStore";
import { DeleteButton } from "./DeleteButton";

import { useAuthStore } from "@/stores/authStore";

const size = 10;

const positionLabelMap: Record<string, string> = {
  NONE: "전체",
  VOCAL: "보컬제외",
  GUITAR: "기타제외",
  KEYBOARD: "키보드제외",
  BASS: "베이스제외",
  DRUM: "드럼제외",
};

const ScheduleBoard = () => {
  const teamId = useTeamStore((state) => state.teamId);
  const { teamInfo } = useTeamStore();
  const { user } = useAuthStore();

  const isMember = teamInfo?.members.some((m) => m.userId === user?.id);

  const [page, setPage] = useState(0);
  const { data } = useGetTeamSchedules(teamId!, page, size);

  const schedules = data?.data.content ?? [];
  const pageInfo = data?.data.pageInfo;

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>팀 연습 일정</h2>
        {isMember && (
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
        )}
      </header>

      {/* 연습일정 */}
      {pageInfo?.totalElements === 0 ? (
        <p className={styles.empty_message}>
          연습 일정이 없습니다. <br />
        </p>
      ) : (
        <>
          <div className={styles.content_container}>
            {schedules.map((item) => (
              <div className={styles.content_item} key={item.id}>
                <span className={styles.content_type}>
                  {item.noPosition ? positionLabelMap[item.noPosition] : "전체"}
                </span>
                <DeleteButton scheduleId={item.id} />

                <div className={styles.content_item_info}>
                  <span>{item.name}</span>
                  <p>{`${format(new Date(item.startDatetime), "MM월 dd일 HH:mm")} ~ ${format(new Date(item.endDatetime), "HH:mm")}`}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={pageInfo?.first}
            >
              이전
            </button>
            <span>
              {page + 1} / {pageInfo?.totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={pageInfo?.last}
            >
              다음
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ScheduleBoard;
