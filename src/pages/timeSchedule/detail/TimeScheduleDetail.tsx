import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import {
  useDeleteTimeSchedule,
  useGetTimeScheduleDetail,
  useUpdateTimeSchedule,
} from "@/apis/timetable";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initialTimeTableData, timeTableSchema } from "../constants";
import { z } from "zod";
import styles from "./TimeScheduleDetail.module.css";
import { useEffect, useState } from "react";
import TimeScheduler from "@/components/scheduler/TimeScheduler";
import Field from "@/components/field/Field";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import clsx from "clsx";
import cloneDeep from "lodash-es/cloneDeep";
import type { Range } from "@/types/timeTable";
import DeleteModal from "@/components/modal/deleteModal/DeleteModal";
import { PageEndpoints } from "@/constants/endpoints";
import { useNavigate } from "react-router-dom";

import ArrowBack from "@/pages/vote/style/arrowback.svg";

const TimeScheduleDetail = () => {
  const [mySchedule, setMySchedule] = useState<Map<string, boolean>>(new Map());
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: timeSchedule } = useGetTimeScheduleDetail(id ?? "");
  const { mutate: updateTimeSchedule } = useUpdateTimeSchedule(id ?? "");
  const { mutate: deleteTimeSchedule } = useDeleteTimeSchedule(id ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof timeTableSchema>>({
    resolver: zodResolver(timeTableSchema),
  });

  const onSubmit = (data: z.infer<typeof timeTableSchema>) => {
    updateTimeSchedule(data);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timetableData = cloneDeep(initialTimeTableData);

    mySchedule.forEach((isSelected, id) => {
      const [day, time] = id.split("-");
      if (isSelected) {
        timetableData[day as Range].push(time);
      }
    });
    setValue("timetableData", timetableData);
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    if (!timeSchedule) return;
    setValue("name", timeSchedule.data.name);
    setValue("timetableData", timeSchedule.data.timetableData);
  }, [setValue, timeSchedule]);

  if (!id || !timeSchedule) return <div>시간표를 찾을 수 없어요.</div>;
  return (
    <DefaultLayout>
      <section className={styles.wrapper_container}>
        <form onSubmit={handleFormSubmit} className={styles.container}>
          <div className={styles.header}>
            <img
              src={ArrowBack}
              alt="뒤로가기"
              onClick={() => navigate(PageEndpoints.MYPAGE)}
              className={styles.back_button}
            />
            <h1 className={styles.title}>시간표 수정</h1>
            <p className={styles.description}>
              시간표 이름과 시간표 데이터를 수정할 수 있어요.
            </p>

            <DeleteModal
              trigger={
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className={styles.delete_button}
                >
                  삭제
                </Button>
              }
              title="시간표 삭제"
              onDelete={() => {
                deleteTimeSchedule(undefined, {
                  onSuccess: () => {
                    navigate(PageEndpoints.MYPAGE);
                  },
                });
              }}
              description="정말 해당 시간표를 삭제 하시겠어요?"
            />
          </div>

          <TimeScheduler
            isEditable
            onTimeScheduleChange={setMySchedule}
            initialTimeSchedule={timeSchedule?.data.timetableData}
          />

          <div className={styles.footer}>
            <Field
              label="시간표 제목"
              error={errors.name}
              className={styles.field}
              isRequired
            >
              <Input {...register("name")} style={{ height: "3rem" }} />
            </Field>

            <Button
              type="submit"
              className={clsx(
                !errors.name && styles.not_error,
                styles.save_button
              )}
            >
              수정완료
            </Button>
          </div>
        </form>
      </section>
    </DefaultLayout>
  );
};

export default TimeScheduleDetail;
