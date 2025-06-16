import { useState } from "react";
import styles from "./EveryTimeModal.module.css";
import Field from "@/components/field/Field";
import Input from "@/components/input/Input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/button/Button";

import { fetchTimeTableFromEverytime } from "@/apis/everytime";
import FullscreenLoading from "./FullscreenLoading";

interface EveryTimeModalProps {
  onApply: (timetableData: Record<string, string[]>) => void;
}

const urlSchema = z.object({
  url: z
    .string()
    .nonempty("URL을 입력해주세요.")
    .url("유효한 URL 형식이 아닙니다.")
    .regex(
      /^https?:\/\/(everytime\.kr|everytime.kr)\/?[\w-/?=&]*/i,
      "에브리타임 주소만 입력 가능합니다."
    ),
});

type UrlFormData = z.infer<typeof urlSchema>;

export default function EveryTimeModal({ onApply }: EveryTimeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 로딩가딩가딩
  const [isLoading, setIsLoading] = useState(false);

  // 에러메세지 추가
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: UrlFormData) => {
    try {
      setIsLoading(true);
      const res = await fetchTimeTableFromEverytime(data.url);
      onApply(res.data.timetableData);
    } catch {
      setErrorMessage("시간표를 불러오지 못했습니다. URL을 다시 확인해주세요.");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <main className={styles.container}>
      {isLoading && <FullscreenLoading />}

      <p className={styles.guide}>
        에브리타임 시간표를 불러올 수 있어요.
        <br />
      </p>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.toggleBtn}
      >
        {isOpen ? "가이드 닫기 ▲" : "가이드 보기 ▼"}
      </button>

      {isOpen && (
        <div className={styles.imageWrapper}>
          <img
            src="/everytime_guide.png"
            alt="에브리타임 사용 가이드"
            className={styles.guideImage}
          />
        </div>
      )}

      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <Field
          label="시간표 URL 붙여넣기"
          error={errors.url}
          isRequired
          style={{ fontSize: "0.9rem" }}
        >
          <Input
            placeholder="https://everytime.kr/..."
            {...register("url")}
            style={{ height: "2rem" }}
          />
        </Field>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <Button type="submit" size="md" variant="secondary">
          등록하기
        </Button>
      </form>
    </main>
  );
}
