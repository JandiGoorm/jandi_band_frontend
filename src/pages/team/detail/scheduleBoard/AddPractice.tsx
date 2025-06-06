// 스케줄 등록 모달에 들어갈 내용
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "@/pages/team/detail/scheduleBoard/AddPractice.module.css";
import Field from "@/components/field/Field";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import { computeEndDatetime } from "./computeEndTime";
import { usePostTeamSchedules } from "@/apis/calendar";
import { useTeamStore } from "@/stores/teamStore";

import { ApiEndpotins } from "@/constants/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import { buildPath } from "@/utils/buildPath";

// 일단 고정해놓긴 했는데 변경해야하나?
const size = 10;
const page = 0;

interface Props {
  setOpen: (open: boolean) => void;
}

const addFormSchema = z
  .object({
    name: z.string().nonempty("캘린더에 표시될 일정 이름을 입력해주세요."),
    startDatetime: z.string().nonempty("시작 시간과 날짜를 선택하세요."),
    endtime: z.string().nonempty("종료 시간을 선택하세요."),
    noPosition: z
      .string()
      .nonempty("불참 포지션을 선택해주세요. 없을 경우 없음을 선택해주세요."),
  })
  .refine(
    (data) => {
      const end = computeEndDatetime(data.startDatetime, data.endtime);
      return end > new Date(data.startDatetime);
    },
    {
      path: ["endtime"], // 에러 표시할 필드 설정
      message: "종료 시간은 시작 시간보다 늦어야 합니다.",
    }
  );

// 폼 타입 추출
export type AddFormData = z.infer<typeof addFormSchema>;

const positions = {
  NULL: "없음(전체참여)",
  VOCAL: "보컬",
  GUITAR: "기타",
  KEYBOARD: "키보드",
  BASS: "베이스",
  DRUM: "드럼",
} as const;

export default function AddPractice({ setOpen }: Props) {
  const queryClient = useQueryClient();
  const teamId = useTeamStore((state) => state.teamId);
  // 스키마랑 연결
  const form = useForm<AddFormData>({
    resolver: zodResolver(addFormSchema),
  });

  const {
    formState: { errors },
    handleSubmit,
  } = form;

  // 서버로 전송하기 위해 형식 변경 (서버와 일치)
  const formatToServer = (date: Date) => date.toISOString().slice(0, 19);

  const { mutate: postSchedules } = usePostTeamSchedules(teamId!);

  const onSubmit = (data: AddFormData) => {
    const start = new Date(data.startDatetime);
    const end = computeEndDatetime(data.startDatetime, data.endtime);
    const finalNoPosition = data.noPosition === "NULL" ? null : data.noPosition;

    // 서버와 양식 일치
    const payload = {
      name: data.name,
      startDatetime: formatToServer(start),
      endDatetime: formatToServer(end),
      noPosition: finalNoPosition,
    };

    postSchedules(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            buildPath(ApiEndpotins.TEAM_SCHEDULES, { teamId: teamId! }),
            { page, size },
          ] as const,
        });

        setOpen(false);
      },
      onError: (err) => {
        console.error("실패:", err);
      },
    });
  };

  return (
    <main className={styles.addpractice_container}>
      <p className={styles.guide}>
        <span className={styles.dot}>*</span> 는 필수 입력 항목입니다.
      </p>

      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <Field label="일정 이름" error={errors.name} isRequired>
          <Input
            inputSize="sm"
            {...form.register("name")}
            placeholder="예시: 새벽별 합주"
          />
        </Field>
        <Field label="연습 시간" error={errors.startDatetime} isRequired>
          <Input
            inputSize="sm"
            type="datetime-local"
            {...form.register("startDatetime")}
          />
        </Field>
        <Field label="연습 종료 시간" error={errors.endtime} isRequired>
          <Input inputSize="sm" type="time" {...form.register("endtime")} />
        </Field>

        <Field label="불참 포지션" error={errors.noPosition} isRequired>
          <div className={styles.radio_button_group}>
            {Object.entries(positions).map(([key, label]) => (
              <label key={key} className={styles.radio_button}>
                <input
                  type="radio"
                  value={key}
                  {...form.register("noPosition")}
                  className={styles.radio_input}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </Field>
        <p className={styles.guide}>
          등록한 일정은 동아리 메인 캘린더에서도 확인이 가능합니다.
        </p>

        <Button type="submit" size="md" variant="secondary">
          일정 등록하기
        </Button>
      </form>
    </main>
  );
}
