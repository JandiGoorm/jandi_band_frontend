import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "@/pages/vote/select/Recommend.module.css";
import Field from "@/components/field/Field";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";

// 유효성 검사 스키마 직성
const voteFromSchema = z.object({
  title: z.string().nonempty("곡 제목을 입력해주세요."),
  singer: z.string().nonempty("가수 또는 밴드 이름을 입력해주세요."),
  reason: z.string().optional(),
  youtube: z.string().nonempty("유튜브 링크를 입력해주세요."),
});

const Recommend = () => {
  // 스키마랑 연결
  const form = useForm({
    resolver: zodResolver(voteFromSchema),
  });

  const {
    formState: { errors },
  } = form;

  return (
    <main className={styles.recommend_container}>
      <p>
        <span className={styles.dot}>*</span> 는 필수 입력 항목입니다.
      </p>

      <form
        className={styles.form_container}
        onSubmit={form.handleSubmit((data) => console.log(data))}
      >
        <Field
          label={
            <>
              곡 제목 <span className={styles.dot}>*</span>
            </>
          }
          error={errors.title}
        >
          <Input inputSize="sm" {...form.register("title")} />
        </Field>

        <Field
          label={
            <>
              가수/밴드명 <span className={styles.dot}>*</span>
            </>
          }
          error={errors.singer}
        >
          <Input inputSize="sm" {...form.register("singer")} />
        </Field>

        <Field
          label={
            <>
              선택 이유 한마디 <span className={styles.option}>(선택)</span>
            </>
          }
          error={errors.reason}
        >
          <Input inputSize="sm" {...form.register("reason")} />
        </Field>

        <Field
          label={
            <>
              유튜브 링크 <span className={styles.dot}>*</span>
            </>
          }
          error={errors.youtube}
        >
          <Input inputSize="sm" {...form.register("youtube")} />
        </Field>

        <Button type="submit" size="md" variant="secondary">
          곡 추가하기
        </Button>
      </form>
    </main>
  );
};

export default Recommend;
