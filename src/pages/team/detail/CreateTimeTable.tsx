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

import ArrowBack from "@/pages/vote/style/arrowback.svg";

import Modal from "@/components/modal/Modal";
import EveryTimeModal from "@/pages/timeSchedule/post/EveryTimeModal";

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

  // 에타 불러오면서 추가한거
  const [importedSchedule, setImportedSchedule] = useState<
    Record<Range, string[]>
  >({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  });

  // 에타, 불러온거 둘다 사용하기 위함
  const [actualTimeSchedule, setActualTimeSchedule] = useState<
    Record<Range, string[]> | undefined
  >();

  useEffect(() => {
    const isImported = Object.values(importedSchedule).some(
      (arr) => arr.length > 0
    );

    if (isImported) {
      setActualTimeSchedule(importedSchedule);
    } else {
      setActualTimeSchedule(initialTimeSchedule);
    }
  }, [importedSchedule, initialTimeSchedule]);

  return (
    <div className={styles.wrapper_container}>
      <form className={styles.container} onSubmit={handleFormSubmit}>
        <header className={styles.header}>
          <img
            src={ArrowBack}
            alt="뒤로가기"
            onClick={() =>
              navigate(buildPath(PageEndpoints.TEAM_DETAIL, { id: teamId }))
            }
            className={styles.back_button}
          />
          <h1 className={styles.title}>시간표 입력</h1>
          <p className={styles.description}>
            가능한 시간대를 클릭하거나 드래그하여 선택해주세요.
          </p>
        </header>

        <section className={styles.but_container}>
          <Button
            variant="secondary"
            className={styles.save_button}
            type="submit"
          >
            저장하기
          </Button>
          <Modal
            title="에타 시간표 불러오기"
            trigger={
              <button className={styles.etbut}>
                <img className={styles.etimg} src="/et.png" />
              </button>
            }
          >
            <EveryTimeModal
              onApply={(timetableData) => setImportedSchedule(timetableData)}
            />
          </Modal>
        </section>

        <TimeScheduler
          isEditable
          onTimeScheduleChange={setMySchedule}
          isLoad
          // initialTimeSchedule={initialTimeSchedule}
          initialTimeSchedule={actualTimeSchedule}
        />
      </form>
    </div>
  );
};

export default CreateTimeTable;
