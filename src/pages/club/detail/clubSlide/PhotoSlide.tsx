import Button from "@/components/button/Button";
import styles from "./PhotoSlide.module.css";
import Slide from "@/components/slide/Slide";
import Modal from "@/components/modal/Modal";
import PhotoModal from "./modalContent/PhotoModal";
import type { PhotoResponse } from "@/types/photo";
import PhotoCard from "@/components/cards/PhotoCard";

const PhotoSlide = ({
  isMember,
  photos,
}: {
  isMember: boolean;
  photos: PhotoResponse[];
}) => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>동아리 사진들</div>
        {isMember ? (
          <Modal
            title="사진 등록하기"
            trigger={
              <Button variant="primary" size="md">
                사진 등록
              </Button>
            }
          >
            <PhotoModal />
          </Modal>
        ) : null}
      </header>
      <section className={styles.slider_box}>
        <Slide<PhotoResponse> items={photos} size="md">
          {(item) => <PhotoCard item={item} />}
        </Slide>
      </section>
    </main>
  );
};

export default PhotoSlide;
