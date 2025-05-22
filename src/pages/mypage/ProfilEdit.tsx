import Profile from "@/pages/vote/style/profile.svg";
import styles from "@/pages/mypage/ProfileEdit.module.css";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";

import { useForm } from "react-hook-form";
import Field from "@/components/field/Field";
import UniversitySelect from "@/pages/auth/signUp/UniversitySelect";
import PositionSelect from "@/pages/auth/signUp/PositionSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "@/pages/auth/signUp/constants";

const ProfilEdit = () => {
  const formController = useForm({
    resolver: zodResolver(signUpFormSchema),
  });

  const {
    formState: { errors },
  } = formController;

  return (
    <main className={styles.edit_container}>
      <img src={Profile} alt="프로필 사진" />

      <form className={styles.form_container}>
        <label>닉네임</label>
        <Input inputSize="sm" />

        <Field label="포지션" error={errors.position}>
          <PositionSelect formController={formController} />
        </Field>

        <Field label="소속대학" error={errors.university}>
          <UniversitySelect formController={formController} />
        </Field>

        <Button type="submit">수정 완료</Button>
      </form>
    </main>
  );
};

export default ProfilEdit;
