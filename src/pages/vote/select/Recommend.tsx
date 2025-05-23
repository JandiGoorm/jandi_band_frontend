import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "@/pages/vote/select/Recommend.module.css";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";

const Recommend = () => {
  const formSchema = z.object({
    name: z.string().nonempty("이름은 필수입니다"),
  });

  // 이 객체 안에 register가 들어있음.
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <main className={styles.recommend_container}>
      <p>
        <span>*</span> 는 필수 입력 항목입니다.
      </p>
      <form
        className={styles.form_container}
        onSubmit={form.handleSubmit((data) => console.log(data))}
      >
        <input {...form.register("name")} />
        {form.formState.errors.name && (
          <p>{form.formState.errors.name.message}</p>
        )}

        <Input inputSize="sm" />
        <Input inputSize="sm" />
        <Input inputSize="sm" />
        <Input inputSize="sm" />

        <Button type="submit" size="md" variant="secondary">
          곡 추가하기
        </Button>
      </form>
    </main>
  );
};

export default Recommend;
