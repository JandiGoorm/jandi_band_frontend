import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import styles from "./LoadSchedules.module.css";
import { FiPlus } from "react-icons/fi";
import { useGetMyTimeTables, useGetTimeScheduleDetail } from "@/apis/timetable";
import TimeTableCards from "@/components/cards/TimeTableCards";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { convertTimeTableToMap } from "@/utils/timetable";
import { useSelectableAreaContext } from "@/components/scheduler/SelectableArea";

const LoadSchedules = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: timeTables } = useGetMyTimeTables();
  const { data: timeTableDetail, refetch } = useGetTimeScheduleDetail(
    String(selectedId ?? ""),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const { setSelectedItems } = useSelectableAreaContext();

  useEffect(() => {
    if (!selectedId || !timeTableDetail) return;
    const timeTable = convertTimeTableToMap(
      timeTableDetail.data.timetableData ?? null
    );
    setSelectedItems(timeTable);
  }, [selectedId, timeTableDetail, setSelectedItems]);

  return (
    <Modal
      trigger={
        <Button variant="secondary" className={styles.load_schedules_button}>
          <FiPlus size={20} />
        </Button>
      }
      title="내 시간표 가져오기"
    >
      {(setOpen) => {
        return (
          <section className={styles.container}>
            <h3 className={styles.title}>내 시간표 목록</h3>
            <p className={styles.guide}>
              {" "}
              마이페이지에서 시간표를 저장하고 불러올 수 있어요{" "}
            </p>

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

            <Button
              variant="secondary"
              className={styles.button}
              onClick={() => {
                refetch();
                setOpen(false);
              }}
            >
              불러오기
            </Button>
          </section>
        );
      }}
    </Modal>
  );
};

export default LoadSchedules;
