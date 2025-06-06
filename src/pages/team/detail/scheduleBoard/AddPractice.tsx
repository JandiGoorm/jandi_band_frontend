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

const addFormSchema = z.object({
  name: z.string().nonempty("캘린더에 표시될 일정 이름을 입력해주세요."),
});

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
        <Button type="submit" size="md" variant="secondary">
          일정 등록하기
        </Button>
      </form>
    </main>
  );
}
