import { useState } from "react";
import styles from "./CreateTimeTable.module.css";
import TimeScheduler from "@/components/scheduler/TimeScheduler";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/button/Button";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";

const CreateTimeTable = () => {
  const [mySchedule, setMySchedule] = useState<Map<string, boolean>>(new Map());
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(mySchedule);

  return (
    <div className={styles.wrapper_container}>
      <main className={styles.container}>
        <header className={styles.header}>
          <Button
            className={styles.back_button}
            variant="secondary"
            onClick={() =>
              navigate(buildPath(PageEndpoints.TEAM_DETAIL, { id: id ?? "" }))
            }
          >
            팀페이지로
          </Button>
          <h1 className={styles.title}>시간표 입력</h1>
          <p className={styles.description}>
            가능한 시간대를 클릭하거나 드래그하여 선택해주세요.
          </p>
        </header>

        <TimeScheduler isEditable onTimeScheduleChange={setMySchedule} />
        <Button variant="secondary" className={styles.save_button}>
          저장하기
        </Button>
      </main>
    </div>
  );
};

export default CreateTimeTable;
