import styles from "./ModifyPromfileModal.module.css";
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import Button from "@/components/button/Button";
import { useUpdateClubImage } from "@/apis/club";

const ModifyProfileModal = ({ image }: { image: string }) => {
  const { id } = useParams();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [imageURL, setimageURL] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { mutate: updateImage } = useUpdateClubImage(id!);

  const handleClickSection = () => {
    imageInputRef.current?.click();
  };

  const imageUpload = () => {
    const file = imageInputRef.current?.files?.item(0);

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setimageURL(imageUrl);
    setImageFile(file);
  };

  const handleSubmit = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    updateImage(formData);
  };
  return (
    <main className={styles.container}>
      <p className={styles.guide}>이미지를 클릭하여 수정하세요</p>
      <div className={styles.image_input_box} onClick={handleClickSection}>
        {imageURL || image ? (
          <img
            src={imageURL || image}
            alt="선택된 이미지"
            className={styles.image}
          />
        ) : (
          <p className={styles.placeholder}>
            이미지를
            <br />
            추가해주세요
          </p>
        )}

        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          ref={imageInputRef}
          onChange={imageUpload}
          required
        />
      </div>
      <Button
        variant="secondary"
        className={styles.submit_button}
        onClick={handleSubmit}
      >
        수정하기
      </Button>
    </main>
  );
};

export default ModifyProfileModal;
