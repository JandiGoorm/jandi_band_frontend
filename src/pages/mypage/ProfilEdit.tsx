import { useRef, useState } from "react";
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

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

const ProfilEdit = () => {
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
    nickname: z.string(),
    position: z
      .string({ required_error: "포지션을 선택하세요." })
      .min(1, { message: "포지션을 선택하세요." }),
    university: z
      .string({ required_error: "대학을 선택하세요." })
      .min(1, { message: "대학을 선택하세요." }),
  });

  const formController = useForm({
    resolver: zodResolver(MyPageFormSchema),
  });

  const {
    formState: { errors },
  } = formController;

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

      <form className={styles.form_container}>
        <Field label="닉네임" error={errors.nickname}>
          <Input inputSize="sm" {...formController.register("nickname")} />
        </Field>

        <Field label="포지션" error={errors.position}>
          <PositionSelect
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
