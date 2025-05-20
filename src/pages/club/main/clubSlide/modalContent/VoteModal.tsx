import Field from "@/components/field/Field";
import styles from "./VoteModal.module.css";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { voteCreateFormSchema } from "./constants";
import { z } from "zod";
import Button from "@/components/button/Button";

const VoteModal = () => {
  const formController = useForm({
    resolver: zodResolver(voteCreateFormSchema),
  });

  const onSubmit = (data: z.infer<typeof voteCreateFormSchema>) => {
    console.log(data);
  };
  const {
    formState: { errors },
  } = formController;

  return (
    <form
      className={styles.container}
      onSubmit={formController.handleSubmit(onSubmit)}
    >
      <Field label="투표 이름" error={errors.title}>
        <Input inputSize="sm" {...formController.register("title")} />
      </Field>
      <Field label="투표 마감시간" error={errors.endtime}>
        <Input
          inputSize="sm"
          type="datetime-local"
          {...formController.register("endtime")}
        />
      </Field>

      <Button
        type="submit"
        size="md"
        variant="secondary"
        className={styles.submit_button}
      >
        투표 생성
      </Button>
    </form>
  );
};

export default VoteModal;
