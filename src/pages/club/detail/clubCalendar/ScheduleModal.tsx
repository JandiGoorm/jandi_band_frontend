import Field from "@/components/field/Field";
import styles from "./ScheduleModal.module.css";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/button/Button";

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

    description: z.string().max(50, { message: "50자 이내로 입력해주세요." }),
  })
  .refine((data) => data.endtime > data.starttime, {
    path: ["endtime"],
    message: "마감시간은 시작시간보다 뒤여야 합니다.",
  });

const ScheduleModal = () => {
  const formController = useForm({
    resolver: zodResolver(sceduleFormSchema),
  });

  const onSubmit = (data: z.infer<typeof sceduleFormSchema>) => {
    console.log(data);
  };
  const {
    formState: { errors },
  } = formController;

  return (
    <form
      className={styles.container}
      onSubmit={formController.handleSubmit(onSubmit)}
    >
      <Field label="스케줄 제목" error={errors.title}>
        <Input inputSize="sm" {...formController.register("title")} />
      </Field>
      <Field label="시작시간" error={errors.starttime}>
        <Input
          inputSize="sm"
          type="datetime-local"
          {...formController.register("starttime")}
        />
      </Field>
      <Field label="마감시간" error={errors.endtime}>
        <Input
          inputSize="sm"
          type="datetime-local"
          {...formController.register("endtime")}
        />
      </Field>
      <Field label="추가내용(필x)" error={errors.description}>
        <Input inputSize="sm" {...formController.register("description")} />
      </Field>

      <Button
        type="submit"
        size="md"
        variant="secondary"
        className={styles.submit_button}
      >
        팀 생성
      </Button>
    </form>
  );
};

export default ScheduleModal;
