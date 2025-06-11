import type { CommemtResponse } from "@/types/promotion";
import styles from "./CommentItem.module.css";

const CommentItem = ({ item }: { item: CommemtResponse }) => {
  return (
    <article className={styles.comment_box} key={item.id}>
      <header className={styles.comment_title}>
        <p className={styles.comment_name}>{item.creatorName}</p>
        <p className={styles.comment_time}>{item.createdAt}</p>
      </header>
      <div>
        <p>{item.description}</p>
      </div>
    </article>
  );
};

export default CommentItem;
