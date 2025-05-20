import Field from "@/components/field/Field";
import styles from "./TeamModal.module.css";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamCreateFormSchema } from "./constants";
import { z } from "zod";
import UniversitySelect from "./UniversitySelect";
import MemberSelect from "./MemberSelect";
import Button from "@/components/button/Button";

const TeamModal = () => {
  const formController = useForm({
    resolver: zodResolver(teamCreateFormSchema),
  });

  const onSubmit = (data: z.infer<typeof teamCreateFormSchema>) => {
    console.log(data);
  };
  const {
    formState: { errors },
  } = formController;

  return (
    <form
      className={styles.container}
      onSubmit={formController.handleSubmit(onSubmit)}
    >
      <Field label="팀 이름" error={errors.title}>
        <Input inputSize="sm" {...formController.register("title")} />
      </Field>
      <Field label="소속대학" error={errors.university}>
        <UniversitySelect formController={formController} />
      </Field>
      <Field label="팀 멤버" error={errors.member}>
        <MemberSelect formController={formController} />
      </Field>

      <Button
        type="submit"
        size="md"
        variant="secondary"
        className={styles.submit_button}
      >
        팀 생성
      </Button>
    </form>
  );
};

export default TeamModal;
