import styles from "./PhotoCard.module.css";
import type { PhotoResponse } from "@/types/photo";

const PhotoCard = ({ item }: { item: PhotoResponse }) => {
  return (
    <main className={styles.card}>
      <img className={styles.image} src={item.imageUrl} />
      <p className={styles.text}>{item.isPinned}</p>
    </main>
  );
};

export default PhotoCard;
