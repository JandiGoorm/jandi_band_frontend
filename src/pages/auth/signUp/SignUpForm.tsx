import styles from "./SignUpForm.module.css";
import PositionSelect from "@/pages/auth/signUp/PositionSelect";
import UniversitySelect from "./UniversitySelect";
import { useForm } from "react-hook-form";
import { signUpFormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Field from "@/components/field/Field";

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
      <Field label="포지션" error={errors.position}>
        <PositionSelect formController={formController} />
      </Field>

      <Field label="소속대학" error={errors.university}>
        <UniversitySelect formController={formController} />
      </Field>

      <button type="submit" className={styles.button}>
        시작하기
      </button>
    </form>
  );
};

export default SignUpForm;
