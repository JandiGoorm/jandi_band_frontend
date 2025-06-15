import PhotoModal from "../modal/photoModal/PhotoModal";
import styles from "./PhotoCard.module.css";
import type { PhotoResponse } from "@/types/photo";

const PhotoCard = ({
  item,
  refetch,
}: {
  item: PhotoResponse;
  refetch: () => void;
}) => {
  return (
    <PhotoModal
      trigger={
        <div className={styles.card}>
          <img className={styles.image} src={item.imageUrl} />
          <p className={styles.text}>{item.isPinned ? "고정됨" : ""}</p>
        </div>
      }
      title="사진 상세보기"
      photo={item}
      refetch={refetch}
    />
  );
};

export default PhotoCard;
