import Button from "@/components/button/Button";
import styles from "./PhotoSlide.module.css";
import Slide from "@/components/slide/Slide";
import Modal from "@/components/modal/Modal";
import PhotoModal from "./modalContent/PhotoModal";
import type { PhotoResponse } from "@/types/photo";
import PhotoCard from "@/components/cards/PhotoCard";
import { useNavigate, useParams } from "react-router-dom";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";

const PhotoSlide = ({
  isMember,
  photos,
  refetchPhotos,
}: {
  isMember: boolean;
  photos: PhotoResponse[];
  refetchPhotos: () => void;
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div
          className={styles.title_box}
          onClick={() =>
            navigate(buildPath(PageEndpoints.PHOTO_LIST, { id: id! }))
          }
        >
          <p className={styles.title}>동아리 사진들</p>
          <p className={styles.more}>더보기</p>
        </div>
        {isMember ? (
          <Modal
            title="사진 등록하기"
            trigger={
              <Button variant="primary" size="md">
                사진 등록
              </Button>
            }
          >
            <PhotoModal refetchPhotos={refetchPhotos} />
          </Modal>
        ) : null}
      </header>
      <section className={styles.slider_box}>
        <Slide items={photos.map((p) => ({ ...p, id: p.photoId }))} size="md">
          {(item) => (
            <PhotoCard key={item.photoId} item={item} refetch={refetchPhotos} />
          )}
        </Slide>
      </section>
    </main>
  );
};

export default PhotoSlide;
