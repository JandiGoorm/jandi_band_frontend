import Modal from "@/components/modal/Modal";
import styles from "./CreateClubModal.module.css";
import Field from "@/components/field/Field";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import UniversitySelect from "@/components/select/UniversitySelect";
import Button from "@/components/button/Button";
import { usePostClub } from "@/apis/club";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";

const createClubScheme = z.object({
  name: z
    .string()
    .min(1, "동아리 이름은 필수입니다")
    .max(100, "동아리 이름은 100자 이내여야 합니다"),
  universityId: z.string().optional(),
  chatroomUrl: z
    .string()
    .max(255, "카카오톡 채팅방 링크는 255자 이내여야 합니다")
    .optional(),
  instagramId: z
    .string()
    .max(50, "인스타그램 아이디는 50자 이내여야 합니다")
    .optional(),
  photoUrl: z.string().optional(),
});

export type ClubFormData = z.infer<typeof createClubScheme>;

const CreateClubModal = ({ trigger }: { trigger: React.ReactNode }) => {
  const navigate = useNavigate();
  const { mutate: createClub, data } = usePostClub();

  const formController = useForm<ClubFormData>({
    resolver: zodResolver(createClubScheme),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formController;

  const onSubmit = (data: ClubFormData) => {
    createClub(data);
  };

  useEffect(() => {
    if (!data) return;
    const id = data.data.data.id;
    navigate(buildPath(PageEndpoints.CLUB, { id }));
  }, [data, navigate]);

  return (
    <Modal trigger={trigger} title="동아리 생성하기">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <Field label="동아리 이름" error={errors.name} isRequired>
          <Input {...register("name")} inputSize="lg" />
        </Field>

        <Field label="소속대학" error={errors.universityId}>
          <UniversitySelect
            onValueChange={(university) => {
              formController.setValue("universityId", university.id.toString());
            }}
          />
        </Field>

        <Field label="카카오톡 채팅방 링크" error={errors.chatroomUrl}>
          <Input {...register("chatroomUrl")} inputSize="lg" />
        </Field>

        <Field label="인스타그램 아이디" error={errors.instagramId}>
          <Input
            placeholder="'@'를 제외하고 입력해주세요"
            {...register("instagramId")}
            inputSize="lg"
          />
        </Field>

        <Button
          type="submit"
          size="md"
          className={styles.submit_button}
          variant="secondary"
        >
          동아리 생성하기
        </Button>
      </form>
    </Modal>
  );
};

export default CreateClubModal;
