import Field from "@/components/field/Field";
import styles from "./PhotoModal.module.css";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { photoCreateFormSchema } from "./constants";
import { z } from "zod";
import Button from "@/components/button/Button";
import { useRef } from "react";
import { usePostPhoto } from "@/apis/photo";
import { useParams } from "react-router-dom";

const PhotoModal = ({ refetchPhotos }: { refetchPhotos: () => void }) => {
  const { id } = useParams();
  const { mutate: postPhoto } = usePostPhoto(id || "");
  const formController = useForm({
    resolver: zodResolver(photoCreateFormSchema),
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    formState: { errors },
    watch,
    reset,
  } = formController;

  const selectedFiles = watch("photo");

  const onSubmit = (data: z.infer<typeof photoCreateFormSchema>) => {
    if (!data.photo || data.photo.length === 0) return;

    const formData = new FormData();
    formData.append("image", data.photo[0]);

    postPhoto(formData, {
      onSuccess: () => {
        reset();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        refetchPhotos();
      },
    });
  };

  return (
    <form
      className={styles.container}
      onSubmit={formController.handleSubmit(onSubmit)}
    >
      <Field label="사진 선택하기" error={errors.photo} isRequired>
        <Input
          type="file"
          accept="image/*"
          inputSize="sm"
          {...formController.register("photo")}
          ref={(e) => {
            formController.register("photo").ref(e);
            fileInputRef.current = e;
          }}
          style={{ display: "none" }}
        />
        <div className={styles.select_photo}>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            사진 선택
          </Button>
          <div className={styles.file_list}>
            {selectedFiles && (
              <div className={styles.file_name}>{selectedFiles[0]?.name}</div>
            )}
          </div>
        </div>
      </Field>

      <Button
        type="submit"
        size="md"
        variant="secondary"
        className={styles.submit_button}
      >
        사진 등록
      </Button>
    </form>
  );
};

export default PhotoModal;
