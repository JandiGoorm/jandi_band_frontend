// 내 시간표 입력 페이지
import { useCallback, useEffect, useState } from "react";
import styles from "./CreateTimeTable.module.css";
import TimeScheduler from "@/components/scheduler/TimeScheduler";
import { useNavigate } from "react-router-dom";
import Button from "@/components/button/Button";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postTeamTimeTable } from "./constants";
import { z } from "zod";
import { convertTimeTable } from "@/utils/timetable";
import { type Range } from "@/types/timeTable";
import { usePatchTeamTimeTable } from "@/apis/timetable";
import { useTeamDetail } from "./TeamDetailProvider";
import { useAuthStore } from "@/stores/authStore";

const CreateTimeTable = () => {
  const [initialTimeSchedule, setInitialTimeSchedule] = useState<
    Record<Range, string[]> | undefined
  >(undefined);
  const [mySchedule, setMySchedule] = useState<Map<string, boolean>>(new Map());

  const navigate = useNavigate();
  const { team, teamId } = useTeamDetail();
  const { user } = useAuthStore();

  const { mutate: patchTeamTimeTable } = usePatchTeamTimeTable(teamId);

  const { handleSubmit, setValue } = useForm<z.infer<typeof postTeamTimeTable>>(
    {
      resolver: zodResolver(postTeamTimeTable),
    }
  );

  const onSubmit = useCallback(
    (data: z.infer<typeof postTeamTimeTable>) => {
      patchTeamTimeTable(data);
    },
    [patchTeamTimeTable]
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const timetableData = convertTimeTable(mySchedule);
      setValue("timetableData", timetableData);
      handleSubmit(onSubmit)();
    },
    [handleSubmit, mySchedule, onSubmit, setValue]
  );

  useEffect(() => {
    if (!team || !user) return;
    const myTeamTimeTable = team.members.find(
      (member) => member.userId === user.id
    )?.timetableData;

    if (!myTeamTimeTable) return;
    setInitialTimeSchedule(myTeamTimeTable);
  }, [team, user]);

  return (
    <div className={styles.wrapper_container}>
      <form className={styles.container} onSubmit={handleFormSubmit}>
        <header className={styles.header}>
          <Button
            className={styles.back_button}
            variant="secondary"
            onClick={() =>
              navigate(buildPath(PageEndpoints.TEAM_DETAIL, { id: teamId }))
            }
            type="button"
          >
            팀페이지로
          </Button>
          <h1 className={styles.title}>시간표 입력</h1>
          <p className={styles.description}>
            가능한 시간대를 클릭하거나 드래그하여 선택해주세요.
          </p>
        </header>

        <TimeScheduler
          isEditable
          onTimeScheduleChange={setMySchedule}
          isLoad
          initialTimeSchedule={initialTimeSchedule}
        />

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
