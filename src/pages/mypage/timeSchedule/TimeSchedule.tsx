import { usePostTimeTable } from "@/apis/timetable";
import Button from "@/components/button/Button";
import Field from "@/components/field/Field";
import Input from "@/components/input/Input";
import TimeScheduler from "@/components/scheduler/TimeScheduler";
import { range } from "@/components/scheduler/constants";
import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import { type Range } from "@/types/timeTable";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { cloneDeep } from "lodash-es";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import styles from "./TimeSchedule.module.css";
import { timeTableSchema } from "./constants";

const initialTimeTableData: Record<Range, string[]> = Object.freeze(
  range.reduce(
    (acc, day) => {
      acc[day] = [];
      return acc;
    },
    {} as Record<Range, string[]>
  )
);

const TimeSchedule = () => {
  const [mySchedule, setMySchedule] = useState<Map<string, boolean>>(new Map());

  const { mutate: postTimeTable } = usePostTimeTable();

  const formController = useForm<z.infer<typeof timeTableSchema>>({
    resolver: zodResolver(timeTableSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = formController;

  const onSubmit = (data: z.infer<typeof timeTableSchema>) => {
    postTimeTable(data);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timetableData: Record<Range, string[]> =
      cloneDeep(initialTimeTableData);
    mySchedule.forEach((isSelected, id) => {
      const [day, time] = id.split("-");
      if (isSelected) {
        timetableData[day as Range].push(time);
      }
    });
    setValue("timetableData", timetableData);
    handleSubmit(onSubmit)();
  };

  return (
    <DefaultLayout>
      <main className={styles.wrapper_container}>
        <form onSubmit={handleFormSubmit} className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>내 시간표 설정</h1>
            <p className={styles.description}>
              가능한 시간대를 클릭하거나 드래그하여 선택해주세요.
            </p>
          </header>

          <TimeScheduler isEditable onTimeScheduleChange={setMySchedule} />

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
              저장하기
            </Button>
          </div>
        </form>
      </main>
    </DefaultLayout>
  );
};

export default TimeSchedule;
