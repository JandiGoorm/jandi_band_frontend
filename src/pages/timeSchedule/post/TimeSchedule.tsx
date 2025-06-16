import { usePostTimeTable } from "@/apis/timetable";
import Button from "@/components/button/Button";
import Field from "@/components/field/Field";
import Input from "@/components/input/Input";
import TimeScheduler from "@/components/scheduler/TimeScheduler";
import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import { convertTimeTable } from "@/utils/timetable";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { timeTableSchema } from "../constants";
import styles from "./TimeSchedule.module.css";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";

import ArrowBack from "@/pages/vote/style/arrowback.svg";
import Modal from "@/components/modal/Modal";
import EveryTimeModal from "./EveryTimeModal";

import type { Range } from "@/types/timeTable";

const TimeSchedule = () => {
  const [mySchedule, setMySchedule] = useState<Map<string, boolean>>(new Map());
  const navigate = useNavigate();
  const { mutate: postTimeTable } = usePostTimeTable();

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
    postTimeTable(data, {
      onSuccess: (response) => {
        console.log(response.data);
        navigate(
          buildPath(PageEndpoints.MY_TIMETABLE_DETAIL, {
            id: response.data.data.id,
          })
        );
      },
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timetableData = convertTimeTable(mySchedule);
    setValue("timetableData", timetableData);
    handleSubmit(onSubmit)();
  };

  return (
    <DefaultLayout>
      <main className={styles.wrapper_container}>
        {/* <form onSubmit={handleFormSubmit} className={styles.container}> */}
        <section className={styles.container}>
          <header className={styles.header}>
            <img
              src={ArrowBack}
              alt="뒤로가기"
              onClick={() => navigate(PageEndpoints.MYPAGE)}
              className={styles.back_button}
            />
            <h1 className={styles.title}>내 시간표 설정</h1>
            <p className={styles.description}>
              가능한 시간대를 클릭하거나 드래그하여 선택해주세요.
            </p>
          </header>

          <div className={styles.user_play_box}>
            <form onSubmit={handleFormSubmit} className={styles.footer}>
              <Field
                label="시간표 제목"
                error={errors.name}
                className={styles.field}
                isRequired
              >
                <Input {...register("name")} style={{ height: "2rem" }} />
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
            </form>

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
          </div>
          <TimeScheduler
            isEditable
            onTimeScheduleChange={setMySchedule}
            initialTimeSchedule={importedSchedule}
          />
        </section>
      </main>
    </DefaultLayout>
  );
};

export default TimeSchedule;
