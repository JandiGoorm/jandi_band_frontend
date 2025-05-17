import Input from "@/components/input/Input";
import { commentItems } from "../constants";
import styles from "./Comment.module.css";
import Button from "@/components/button/Button";

const Comment = () => {
  return (
    <section className={styles.comment_container}>
      <header className={styles.comment_header}>댓글 xx개</header>
      <section className={styles.comment_input}>
        <Input inputSize="md" style={{ flex: "1", marginRight: "1rem" }} />
        <Button size="md">댓글달기</Button>
      </section>
      <section className={styles.comment_container}>
        {commentItems.map((item) => (
          <article className={styles.comment_box} key={item.id}>
            <header className={styles.comment_title}>
              <p className={styles.comment_name}>{item.name}</p>
              <p className={styles.comment_time}>{item.time}</p>
            </header>
            <div>
              <p>{item.content}</p>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
};

export default Comment;
