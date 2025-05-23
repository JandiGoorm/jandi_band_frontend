import styles from "@/pages/vote/select/Recommend.module.css";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";

const Recommend = () => {
  return (
    <main className={styles.recommend_container}>
      <p>
        <span>*</span> 는 필수 입력 항목입니다.
      </p>
      <form className={styles.form_container}>
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
