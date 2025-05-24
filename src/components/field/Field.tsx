import type { FieldError } from "react-hook-form";
import styles from "./Field.module.css";
import clsx from "clsx";

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  label: string; // 필드 라벨 ex) 이름, 이메일, 비밀번호
  error: FieldError | undefined; // react-hook-form 에러 객체
  helperText?: string | undefined; // input작성 시 도움 텍스트 ex) 3~10자 특수문자를 포함해서 입력해주세요.
  className?: string; // 필드 컴포넌트 추가 클래스
  isRequired?: boolean; // 필수 필드 여부
}

const Field = ({
  children,
  label,
  error,
  helperText,
  className,
  isRequired = false,
  ...props
}: FieldProps) => {
  return (
    <div className={clsx(styles.container, className)} {...props}>
      <div className={styles.label_container}>
        <label className={styles.label}>
          {isRequired && <span className={styles.required}>*</span>}
          {label}
        </label>
        {helperText && <p className={styles.helper_text}>{helperText}</p>}
      </div>
      {children}
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default Field;
