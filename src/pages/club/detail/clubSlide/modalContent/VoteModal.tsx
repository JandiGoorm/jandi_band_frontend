import Field from "@/components/field/Field";
import styles from "./VoteModal.module.css";
import Input from "@/components/input/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { voteCreateFormSchema } from "./constants";
import { z } from "zod";
import Button from "@/components/button/Button";
import { useCreatePoll } from "@/apis/poll";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";

interface Props {
  setOpen: (open: boolean) => void;
}

const VoteModal = ({ setOpen }: Props) => {
  const { id } = useParams();
  const { mutate: createPoll } = useCreatePoll();
  const navigate = useNavigate();

  const formController = useForm({
    resolver: zodResolver(voteCreateFormSchema),
  });

  const onSubmit = (data: z.infer<typeof voteCreateFormSchema>) => {
    if (!id) return;
    const localDate = new Date(data.endtime);
    const correctedISO = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    ).toISOString();
    createPoll(
      {
        title: data.title,
        clubId: Number(id),
        endDatetime: correctedISO,
      },
      {
        onSuccess: (res) => {
          navigate(buildPath(PageEndpoints.VOTE, { id: res.data.data.id }));
          setOpen(false);
        },
        onError: (err) => {
          console.error("실패", err);
        },
      }
    );
  };

  const {
    formState: { errors },
    handleSubmit,
  } = formController;

  return (
    <main className={styles.make_poll_container}>
      <p className={styles.guide}>
        <span className={styles.dot}>*</span> 는 필수 입력 항목입니다.
      </p>

      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <Field label="투표 이름" error={errors.title} isRequired>
          <Input
            {...formController.register("title")}
            placeholder="예시 : 대동제 곡 선정 투표"
          />
        </Field>
        <Field label="투표 마감시간" error={errors.endtime} isRequired>
          <Input
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
    </main>
  );
};

export default VoteModal;
