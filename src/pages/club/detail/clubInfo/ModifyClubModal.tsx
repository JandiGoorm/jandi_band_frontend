import styles from "./ModifyClubModal.module.css";
import Field from "@/components/field/Field";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/button/Button";
import { useUpdateClub } from "@/apis/club";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import type { ClubDetailResponse } from "@/types/club";
import { queryClient } from "@/config/queryClient";
import { buildPath } from "@/utils/buildPath";
import { ApiEndpotins } from "@/constants/endpoints";

const createClubScheme = z.object({
  name: z
    .string()
    .min(1, "동아리 이름은 필수입니다")
    .max(100, "동아리 이름은 100자 이내여야 합니다"),
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

interface ModifyClubModalProps {
  club: ClubDetailResponse;
  onClose: () => void;
}

const ModifyClubModal = ({ club, onClose }: ModifyClubModalProps) => {
  const { id } = useParams();

  const { mutate: updateClub } = useUpdateClub(id || "");

  const formController = useForm<ClubFormData>({
    resolver: zodResolver(createClubScheme),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = formController;

  useEffect(() => {
    if (!club) return;
    reset({
      name: club.name,
      chatroomUrl: club.chatroomUrl || "",
      instagramId: club.instagramId || "",
    });
  }, [club, reset]);

  if (!id) return <div>잘못된 접근입니다.</div>;

  const onSubmit = (data: ClubFormData) => {
    updateClub(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [buildPath(ApiEndpotins.CLUB_DETAIL, { id })],
        });
        onClose();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Field label="동아리 이름" error={errors.name} isRequired>
        <Input {...register("name")} />
      </Field>

      <Field label="카카오톡 채팅방 링크" error={errors.chatroomUrl}>
        <Input {...register("chatroomUrl")} />
      </Field>

      <Field label="인스타그램 아이디" error={errors.instagramId}>
        <Input {...register("instagramId")} />
      </Field>

      <Button
        type="submit"
        size="md"
        className={styles.submit_button}
        variant="secondary"
      >
        동아리 수정하기
      </Button>
    </form>
  );
};

export default ModifyClubModal;
