import Field from "@/components/field/Field";
import styles from "./TeamModal.module.css";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamCreateFormSchema } from "./constants";
import { z } from "zod";
// import MemberSelect from "./MemberSelect";
import Button from "@/components/button/Button";
import { usePostTeam } from "@/apis/team";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";

export type TeamFormData = z.infer<typeof teamCreateFormSchema>;

const TeamModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: createTeam, data } = usePostTeam(id as string);

  const formController = useForm({
    resolver: zodResolver(teamCreateFormSchema),
  });

  const onSubmit = (data: TeamFormData) => {
    console.log(data);
    createTeam(data);
  };
  const {
    formState: { errors },
  } = formController;

  useEffect(() => {
    if (!data) return;
    const id = data.data.data.id;
    navigate(buildPath(PageEndpoints.TEAM_DETAIL, { id }));
  }, [data, navigate]);

  return (
    <form
      className={styles.container}
      onSubmit={formController.handleSubmit(onSubmit)}
    >
      <Field label="팀 이름" error={errors.name} isRequired>
        <Input inputSize="sm" {...formController.register("name")} />
      </Field>
      {/* <Field label="팀 멤버" error={errors.member}>
        <MemberSelect formController={formController} />
      </Field> */}

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
