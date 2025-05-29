import { useState } from "react";
import styles from "./CreateTimeTable.module.css";
import TimeScheduler from "@/components/scheduler/TimeScheduler";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/button/Button";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postTeamTimeTable } from "./constants";
import { z } from "zod";
import { convertTimeTable } from "@/utils/convertTimeTable";

const CreateTimeTable = () => {
  const [mySchedule, setMySchedule] = useState<Map<string, boolean>>(new Map());
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleSubmit, setValue } = useForm<z.infer<typeof postTeamTimeTable>>(
    {
      resolver: zodResolver(postTeamTimeTable),
    }
  );

  const onSubmit = (data: z.infer<typeof postTeamTimeTable>) => {
    console.log(data);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timetableData = convertTimeTable(mySchedule);
    setValue("timetableData", timetableData);
    handleSubmit(onSubmit)();
  };

  return (
    <div className={styles.wrapper_container}>
      <form className={styles.container} onSubmit={handleFormSubmit}>
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
        <Button
          variant="secondary"
          className={styles.save_button}
          type="submit"
        >
          저장하기
        </Button>
      </form>
    </div>
  );
};

export default CreateTimeTable;
