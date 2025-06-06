// 스케줄 등록 모달에 들어갈 내용
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "@/pages/team/detail/scheduleBoard/AddPractice.module.css";
import Field from "@/components/field/Field";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";

interface Props {
  setOpen: (open: boolean) => void;
}

const addFormSchema = z
  .object({
    name: z.string().nonempty("캘린더에 표시될 일정 이름을 입력해주세요."),
    startDatetime: z.string().nonempty("시작 시간과 날짜를 선택하세요."),
    endtime: z.string().nonempty("종료 시간을 선택하세요."),
  })
  .refine(
    (data) => {
      // 스타트 시간
      const start = new Date(data.startDatetime);
      // [시간,분] 으로 각각의 숫자를 분리해서 넣어놓음
      const [endHour, endMinute] = data.endtime.split(":").map(Number);
      const end = new Date(start); // ex) new Date("2024-06-06T16:00") 가 됨
      end.setHours(endHour, endMinute); // Date에서 기본으로 제공되는 메서드임.
      return end > start;
    },
    {
      path: ["endtime"], // 에러 표시할 필드 설정
      message: "종료 시간은 시작 시간보다 늦어야 합니다.",
    }
  );

// 폼 타입 추출
export type AddFormData = z.infer<typeof addFormSchema>;

export default function AddPractice({ setOpen }: Props) {
  // 스키마랑 연결
  const form = useForm<AddFormData>({
    resolver: zodResolver(addFormSchema),
  });

  const {
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = (data: AddFormData) => {
    console.log(data);
    setOpen(false);
  };

  return (
    <main className={styles.addpractice_container}>
      <p className={styles.guide}>
        <span className={styles.dot}>*</span> 는 필수 입력 항목입니다.
      </p>

      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <Field label="일정 이름" error={errors.name} isRequired>
          <Input inputSize="sm" {...form.register("name")} />
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
        <Button type="submit" size="md" variant="secondary">
          일정 등록하기
        </Button>
      </form>
    </main>
  );
}
