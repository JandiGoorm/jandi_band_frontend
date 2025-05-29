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
    <main className={styles.make_team_container}>
      <p className={styles.guide}>
        <span className={styles.dot}>*</span> 는 필수 입력 항목입니다.
      </p>

      <form
        className={styles.container}
        onSubmit={formController.handleSubmit(onSubmit)}
      >
        <Field label="팀 이름" error={errors.name} isRequired>
          <Input
            inputSize="sm"
            {...formController.register("name")}
            placeholder="예시: Alive 공연 팀"
          />
        </Field>
        {/* <Field label="팀 멤버" error={errors.member}>
          <MemberSelect formController={formController} />
        </Field> */}

        <p className={styles.guide}>
          ※ 팀을 생성할 경우 공통 시간표를 만들 수 있습니다.
        </p>

        <Button
          type="submit"
          size="md"
          variant="secondary"
          className={styles.submit_button}
        >
          팀 생성
        </Button>
      </form>
    </main>
  );
};

export default TeamModal;
