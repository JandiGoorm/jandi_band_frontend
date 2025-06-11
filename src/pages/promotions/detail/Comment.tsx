import Input from "@/components/input/Input";
import { commentItems } from "../constants";
import styles from "./Comment.module.css";
import Button from "@/components/button/Button";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { usePostComment } from "@/apis/promotion";

const Comment = () => {
  const { id } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: postComment } = usePostComment(id || "");

  const handleAddComment = () => {
    const value = inputRef.current?.value.trim();
    if (!value) return;

    postComment(value, {
      onSuccess: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
    });
  };

  return (
    <section className={styles.comment_container}>
      <header className={styles.comment_header}>댓글 xx개</header>
      <section className={styles.comment_input}>
        <Input
          inputSize="md"
          style={{ flex: "1", marginRight: "1rem" }}
          ref={inputRef}
        />
        <Button size="md" onClick={handleAddComment}>
          댓글달기
        </Button>
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
