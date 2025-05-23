import { useSignUp } from "@/apis/auth";
import Field from "@/components/field/Field";
import PositionSelect from "@/pages/auth/signUp/PositionSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpFormSchema } from "./constants";
import styles from "./SignUpForm.module.css";
import UniversitySelect from "./UniversitySelect";
import { useCallback, useEffect } from "react";
import { ApiStatus } from "@/apis/types";
import Loading from "@/components/loading/Loading";
import { z } from "zod";
import { useAuthStore } from "@/stores/authStore";
import { PageEndpoints } from "@/constants/endpoints";
import { useNavigate } from "react-router-dom";

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
      signUp({ ...data, university: "와플대학교" });
    },
    [signUp]
  );

  // 회원가입 성공 시 유저 정보 저장 및 홈으로 이동
  useEffect(() => {
    if (!data || !isSuccess) return;
    setUser(data.data);
    navigate(PageEndpoints.HOME);
  }, [data, isSuccess, navigate, setUser]);

  return (
    <form
      className={styles.form_container}
      onSubmit={formController.handleSubmit(onSubmit)}
    >
      {status === ApiStatus.PENDING && <Loading />}
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
