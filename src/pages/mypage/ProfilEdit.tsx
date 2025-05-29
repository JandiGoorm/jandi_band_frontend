import { useRef, useState } from "react";
import styles from "@/pages/mypage/ProfileEdit.module.css";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import camera from "/public/camera.svg";

import { useForm } from "react-hook-form";
import Field from "@/components/field/Field";
// import UniversitySelect from "@/components/select/UniversitySelect";
import PositionSelect from "@/pages/auth/signUp/PositionSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "@/pages/auth/signUp/constants";

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

  const formController = useForm({
    resolver: zodResolver(signUpFormSchema),
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
        <div>
          <label>닉네임</label>
          <Input inputSize="sm" />
        </div>

        <Field label="포지션" error={errors.position}>
          <PositionSelect formController={formController} />
        </Field>

        {/* <Field label="소속대학" error={errors.university}>
          <UniversitySelect formController={formController} />
        </Field> */}

        <Button type="submit" variant="secondary">
          수정 완료
        </Button>
      </form>
    </main>
  );
};

export default ProfilEdit;
