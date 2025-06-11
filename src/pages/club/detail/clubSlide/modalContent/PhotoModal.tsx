import Field from "@/components/field/Field";
import styles from "./PhotoModal.module.css";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { photoCreateFormSchema } from "./constants";
import { z } from "zod";
import Button from "@/components/button/Button";
import { useRef } from "react";

const PhotoModal = () => {
  const formController = useForm({
    resolver: zodResolver(photoCreateFormSchema),
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (data: z.infer<typeof photoCreateFormSchema>) => {
    console.log(data);
  };
  const {
    formState: { errors },
    watch,
  } = formController;

  const selectedFiles = watch("photo");

  return (
    <form
      className={styles.container}
      onSubmit={formController.handleSubmit(onSubmit)}
    >
      <Field label="사진 선택하기" error={errors.photo} isRequired>
        <Input
          type="file"
          accept="image/*"
          multiple
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
            {selectedFiles &&
              Array.from(selectedFiles).map((file, index) => (
                <div key={index} className={styles.file_name}>
                  {file.name}
                </div>
              ))}
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
