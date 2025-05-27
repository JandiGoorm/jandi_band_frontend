import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "@/pages/vote/select/Recommend.module.css";
import Field from "@/components/field/Field";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";

// 유효성 검사 스키마 직성
const voteFromSchema = z.object({
  songName: z.string().nonempty("곡 제목을 입력해주세요."),
  artistName: z.string().nonempty("가수 또는 밴드 이름을 입력해주세요."),
  youtubeUrl: z
    .string()
    .nonempty("유튜브 링크를 입력해주세요.")
    .regex(
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/,
      "유튜브 링크 형식이 유효하지 않습니다."
    ),
  description: z.string().optional(),
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
      <p className={styles.guide}>
        <span className={styles.dot}>*</span> 는 필수 입력 항목입니다.
      </p>

      <form
        className={styles.form_container}
        onSubmit={form.handleSubmit((data) => console.log(data))}
      >
        <Field label="곡 제목" error={errors.songName} isRequired>
          <Input inputSize="sm" {...form.register("songName")} />
        </Field>

        <Field label="가수/밴드명" error={errors.artistName} isRequired>
          <Input inputSize="sm" {...form.register("artistName")} />
        </Field>

        <Field label="선택 이유 한마디" error={errors.description}>
          <Input inputSize="sm" {...form.register("description")} />
        </Field>

        <Field label="유튜브 링크" error={errors.youtubeUrl} isRequired>
          <Input inputSize="sm" {...form.register("youtubeUrl")} />
        </Field>
        <p className={styles.guide}>
          단일 영상 링크만 입력해주세요. <br />
          재생목록(playlist) 또는 Shorts 링크는 지원되지 않습니다.
        </p>
        <Button type="submit" size="md" variant="secondary">
          곡 추가하기
        </Button>
      </form>
    </main>
  );
};

export default Recommend;
