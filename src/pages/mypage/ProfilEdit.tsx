import { useRef, useState, useEffect } from "react";
import styles from "@/pages/mypage/ProfileEdit.module.css";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import camera from "/public/camera.svg";

import { useForm } from "react-hook-form";
import Field from "@/components/field/Field";
import UniversitySelect from "@/components/select/UniversitySelect";
import PositionSelect from "@/pages/auth/signUp/PositionSelect";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { usePatchInfo } from "@/apis/mypage";

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

interface ProfileEditProps {
  myInfo:
    | {
        nickname: string | null;
        position: string | null;
        university: string | null;
      }
    | undefined;
}

const ProfilEdit = ({ myInfo }: ProfileEditProps) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [imageURL, setimageURL] = useState<string | null>(null);

  const handleClickSection = () => {
    imageInputRef.current?.click();
  };

  const imageUpload = () => {
    const file = imageInputRef.current?.files?.item(0);

    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      alert("10MB 이하의 이미지만 업로드할 수 있습니다.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setimageURL(imageUrl);
  };

  const MyPageFormSchema = z.object({
    nickname: z.string().nullable(),
    position: z.string().nullable(),
    university: z.string().nullable(),
  });

  const formController = useForm({
    resolver: zodResolver(MyPageFormSchema),
    defaultValues: {
      nickname: null,
      position: null,
      university: null,
    },
  });

  const { reset } = formController;

  useEffect(() => {
    if (myInfo) {
      reset({
        nickname: myInfo.nickname ?? null,
        position: myInfo.position ?? null,
        university: myInfo.university ?? null,
      });
    }
  }, [myInfo, reset]);

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = formController;

  const { mutate } = usePatchInfo();

  const onSubmit = () => {
    const file = imageInputRef.current?.files?.[0];
    const { nickname, position, university } = getValues();

    console.log("선택된 파일:", file);

    const formData = new FormData();
    formData.append("nickname", nickname || "null");
    formData.append("position", position || "null");
    formData.append("university", university || "null");

    if (file) {
      formData.append("profilePhoto", file);
    }

    console.log("===== 전송할 FormData =====");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    mutate(formData);
  };

  return (
    <main className={styles.edit_container}>
      <header className={styles.image_inputbox}>
        <div className={styles.image_input} onClick={handleClickSection}>
          {imageURL ? (
            <img
              className={styles.profile_img}
              src={imageURL}
              alt="선택된 이미지"
            />
          ) : (
            <div className={styles.placeholer}>
              <img src={camera} alt="이미지를 추가해주세요" />
              <p>이미지 추가하기</p>
            </div>
          )}

          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            ref={imageInputRef}
            onChange={imageUpload}
          />
        </div>
      </header>

      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <Field label="닉네임" error={errors.nickname}>
          <Input inputSize="sm" {...formController.register("nickname")} />
        </Field>

        <Field label="포지션" error={errors.position}>
          <PositionSelect
            // value={formController.watch("position")}
            onValueChange={(position) => {
              formController.setValue("position", position);
            }}
          />
        </Field>

        <Field label="소속대학" error={errors.university}>
          <UniversitySelect
            onValueChange={(university) => {
              formController.setValue("university", university.name);
            }}
          />
        </Field>

        <Button type="submit" variant="secondary">
          수정 완료
        </Button>
      </form>
    </main>
  );
};

export default ProfilEdit;
