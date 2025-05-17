import styles from "./SignUpForm.module.css";
import PositionSelect from "@/pages/auth/signUp/PositionSelect";
import UniversitySelect from "./UniversitySelect";
import { useForm } from "react-hook-form";
import { signUpFormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const SignUpForm = () => {
  const formController = useForm({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = (data: z.infer<typeof signUpFormSchema>) => {
    // 회원가입 요청
    console.log(data);
  };

  const {
    formState: { errors },
  } = formController;

  return (
    <form
      className={styles.form_container}
      onSubmit={formController.handleSubmit(onSubmit)}
    >
      <div className={styles.form_group}>
        <label htmlFor="position" className={styles.label}>
          포지션
        </label>
        <PositionSelect formController={formController} />
        {errors.position && (
          <p className={styles.error}>{errors.position.message}</p>
        )}
      </div>

      <div className={styles.form_group}>
        <label htmlFor="university" className={styles.label}>
          소속대학
        </label>
        <UniversitySelect formController={formController} />
        {errors.university && (
          <p className={styles.error}>{errors.university.message}</p>
        )}
      </div>

      <button type="submit" className={styles.button}>
        시작하기
      </button>
    </form>
  );
};

export default SignUpForm;
