import Field from "@/components/field/Field";
import styles from "./ScheduleModal.module.css";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/button/Button";

import { usePostCalendarEvent } from "@/apis/calendar";
import { useClubStore } from "@/stores/clubStore"; //클럽 id

// invalidateQueries 사용해보기
import { ApiEndpotins } from "@/constants/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import { buildPath } from "@/utils/buildPath";

export const sceduleFormSchema = z
  .object({
    title: z
      .string()
      .nonempty({ message: "스케줄 제목을 입력하세요." })
      .max(20, { message: "20자 이내로 입력해주세요." }),

    starttime: z.coerce.date({
      required_error: "시작시간을 선택하세요.",
      invalid_type_error: "올바른 날짜와 시간을 선택하세요.",
    }),

    endtime: z.coerce.date({
      required_error: "마감시간을 선택하세요.",
      invalid_type_error: "올바른 날짜와 시간을 선택하세요.",
    }),

    // description: z.string().max(50, { message: "50자 이내로 입력해주세요." }),
  })
  .refine((data) => data.endtime > data.starttime, {
    path: ["endtime"],
    message: "마감시간은 시작시간보다 뒤여야 합니다.",
  });

interface Props {
  setOpen: (open: boolean) => void;
  currentMonth: Date;
  // refetch: () => void;
}

const ScheduleModal = ({ setOpen, currentMonth }: Props) => {
  const queryClient = useQueryClient();
  // 클럽 아이디
  const clubId = useClubStore((state) => state.clubId);
  const { mutate } = usePostCalendarEvent(clubId!);

  const formController = useForm({
    resolver: zodResolver(sceduleFormSchema),
  });

  const formatKST = (date: Date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, -1); // Z 제거
  };

  const onSubmit = (data: z.infer<typeof sceduleFormSchema>) => {
    mutate(
      {
        name: data.title,
        startDatetime: formatKST(data.starttime),
        endDatetime: formatKST(data.endtime),
      },
      {
        onSuccess: () => {
          const year = currentMonth.getFullYear();
          const month = currentMonth.getMonth() + 1;

          queryClient.invalidateQueries({
            queryKey: [
              buildPath(ApiEndpotins.CALENDAR, { clubId: clubId! }),
              { year, month },
            ] as const,
          });

          setOpen(false);
        },
        onError: (err) => {
          console.error("실패", err);
        },
      }
    );
  };

  const {
    formState: { errors },
  } = formController;

  return (
    <main className={styles.scedule_container}>
      <p className={styles.guide}>
        <span className={styles.dot}>*</span> 는 필수 입력 항목입니다.
      </p>

      <form
        className={styles.container}
        onSubmit={formController.handleSubmit(onSubmit)}
      >
        <Field label="일정 제목" error={errors.title} isRequired>
          <Input inputSize="sm" {...formController.register("title")} />
        </Field>
        <Field label="시작 시간" error={errors.starttime} isRequired>
          <Input
            inputSize="sm"
            type="datetime-local"
            {...formController.register("starttime")}
          />
        </Field>
        <Field label="마감 시간" error={errors.endtime} isRequired>
          <Input
            inputSize="sm"
            type="datetime-local"
            {...formController.register("endtime")}
          />
        </Field>
        {/* <Field label="추가 내용" error={errors.description}>
          <Input inputSize="sm" {...formController.register("description")} />
        </Field> */}

        <Button
          type="submit"
          size="md"
          variant="secondary"
          className={styles.submit_button}
        >
          추가하기
        </Button>
      </form>
    </main>
  );
};

export default ScheduleModal;
