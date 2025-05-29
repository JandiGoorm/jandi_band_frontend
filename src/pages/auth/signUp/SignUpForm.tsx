import { useSignUp } from "@/apis/auth";
import Field from "@/components/field/Field";
import { PageEndpoints } from "@/constants/endpoints";
import PositionSelect from "@/pages/auth/signUp/PositionSelect";
import { useAuthStore } from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { signUpFormSchema } from "./constants";
import styles from "./SignUpForm.module.css";
import UniversitySelect from "../../../components/select/UniversitySelect";

const SignUpForm = () => {
  const { mutate: signUp, data, isSuccess } = useSignUp();
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const formController = useForm({
    resolver: zodResolver(signUpFormSchema),
  });

  const {
    formState: { errors },
  } = formController;

  const onSubmit = useCallback(
    (data: z.infer<typeof signUpFormSchema>) => {
      signUp(data);
    },
    [signUp]
  );

  // 회원가입 성공 시 유저 정보 저장 및 홈으로 이동
  useEffect(() => {
    if (!data || !isSuccess) return;
    setUser(data.data.data);
    navigate(PageEndpoints.HOME);
  }, [data, isSuccess, navigate, setUser]);

  return (
    <form
      className={styles.form_container}
      onSubmit={formController.handleSubmit(onSubmit)}
    >
      <Field label="포지션" error={errors.position} isRequired>
        <PositionSelect formController={formController} />
      </Field>

      <Field label="소속대학" error={errors.university} isRequired>
        <UniversitySelect
          onValueChange={(university) => {
            formController.setValue("university", university.name);
          }}
        />
      </Field>

      <button type="submit" className={styles.button}>
        시작하기
      </button>
    </form>
  );
};

export default SignUpForm;
