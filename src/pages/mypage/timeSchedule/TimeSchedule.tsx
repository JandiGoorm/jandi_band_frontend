import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import TimeScheduler from "@/components/scheduler/TimeScheduler";
import { useState } from "react";
import styles from "./TimeSchedule.module.css";
import Button from "@/components/button/Button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Field from "@/components/field/Field";
import Input from "@/components/input/Input";
import { timeTableSchema } from "./constants";
import clsx from "clsx";
import { type Range } from "@/types/timeTable";
import { usePostTimeTable } from "@/apis/timetable";

const TimeSchedule = () => {
  const [mySchedule, setMySchedule] = useState<Record<Range, string[]>>({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  });

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

  const handleTimeSlotChange = (range: Range, time: string) => {
    const isSelected = mySchedule[range].includes(time);

    if (isSelected) {
      setMySchedule((prev) => ({
        ...prev,
        [range]: prev[range].filter((t) => t !== time),
      }));
    } else {
      setMySchedule((prev) => ({
        ...prev,
        [range]: [...prev[range], time],
      }));
    }
  };

  const onSubmit = (data: z.infer<typeof timeTableSchema>) => {
    postTimeTable(data);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValue("timetableData", mySchedule);
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

          <TimeScheduler
            isEditable
            availableTimeSlots={mySchedule}
            setAvailableTimeSlots={setMySchedule}
            onTimeSlotChange={handleTimeSlotChange}
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
              저장하기
            </Button>
          </div>
        </form>
      </main>
    </DefaultLayout>
  );
};

export default TimeSchedule;
