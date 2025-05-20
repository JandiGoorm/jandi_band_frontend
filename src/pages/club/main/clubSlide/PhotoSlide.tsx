import Button from "@/components/button/Button";
import styles from "./PhotoSlide.module.css";
import Slide from "@/components/slide/Slide";
import Modal from "@/components/modal/Modal";
import PhotoModal from "./modalContent/PhotoModal";

const dummyData = [
  { id: 1, name: "Slide 1" },
  { id: 2, name: "Slide 2" },
  { id: 3, name: "Slide 3" },
  { id: 4, name: "Slide 4" },
];
const PhotoSlide = () => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>동아리 사진들</div>
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
      </header>
      <section className={styles.slider_box}>
        <Slide items={dummyData} size="md">
          {(item) => {
            return <div>{item.name}</div>;
          }}
        </Slide>
      </section>
    </main>
  );
};

export default PhotoSlide;
