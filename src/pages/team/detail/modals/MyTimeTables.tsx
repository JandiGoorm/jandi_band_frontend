import Modal from "@/components/modal/Modal";
import styles from "./MyTimeTables.module.css";
import Button from "@/components/button/Button";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";
import { useNavigate } from "react-router-dom";
import { useGetMyTimeTables, usePostTeamTimeTable } from "@/apis/timetable";
import TimeTableCards from "@/components/cards/TimeTableCards";
import { useState } from "react";
import type { Nullable } from "@/types/common";
import clsx from "clsx";

const MyTimeTables = ({ id }: { id: string }) => {
  const [selectedId, setSelectedId] = useState<Nullable<number>>(null);
  const navigate = useNavigate();
  const { data: timeTables } = useGetMyTimeTables();
  const { mutate: postTeamTimeTable } = usePostTeamTimeTable(id);

  const handlePostTeamTimeTable = () => {
    if (!selectedId) return;
    postTeamTimeTable({ userTimetableId: selectedId });
  };

  return (
    <Modal title="내 시간표 가져오기" trigger={<Button>내 시간표 입력</Button>}>
      <section className={styles.container}>
        <h3 className={styles.title}>내 시간표 목록</h3>

        <div className={styles.list_container}>
          {timeTables?.data?.map((timeTable) => (
            <div
              key={timeTable.id}
              className={clsx(
                selectedId === timeTable.id && styles.selected,
                styles.card
              )}
            >
              <TimeTableCards
                timeTable={timeTable}
                onClick={() => setSelectedId(timeTable.id)}
              />
            </div>
          ))}
        </div>

        <div className={styles.button_container}>
          <Button
            variant="secondary"
            className={styles.button}
            onClick={() =>
              navigate(
                buildPath(PageEndpoints.POST_TEAM_TIMETABLE, {
                  id: id ?? "",
                })
              )
            }
          >
            직접작성
          </Button>

          <Button
            variant="secondary"
            className={styles.button}
            onClick={handlePostTeamTimeTable}
          >
            등록
          </Button>
        </div>
      </section>
    </Modal>
  );
};

export default MyTimeTables;
