import Field from "@/components/field/Field";
import styles from "./teamModal.module.css";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { photoCreateFormSchema } from "./constants";
import { z } from "zod";
import Button from "@/components/button/Button";

const PhotoModal = () => {
  const formController = useForm({
    resolver: zodResolver(photoCreateFormSchema),
  });

  const onSubmit = (data: z.infer<typeof photoCreateFormSchema>) => {
    console.log(data);
  };
  const {
    formState: { errors },
  } = formController;

  return (
    <div>
      <form
        className={styles.container}
        onSubmit={formController.handleSubmit(onSubmit)}
      >
        <Field label="사진 선택" error={errors.photo}>
          <Input
            type="file"
            accept="image/*"
            multiple
            inputSize="sm"
            {...formController.register("photo")}
          />
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
    </div>
  );
};

export default PhotoModal;
