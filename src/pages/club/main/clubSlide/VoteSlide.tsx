import Button from "@/components/button/Button";
import styles from "./VoteSlide.module.css";
import Slide from "@/components/slide/Slide";
import Modal from "@/components/modal/Modal";
import VoteModal from "./modalContent/VoteModal";
import VoteCards from "@/components/cards/VoteCards";

const dummyData = [
  { id: 1, name: "Slide 1" },
  { id: 2, name: "Slide 2" },
  { id: 3, name: "Slide 3" },
  { id: 4, name: "Slide 4" },
];
const VoteSlide = () => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>곡 투표 목록</div>
        <Modal
          title="곡 투표 생성하기"
          trigger={
            <Button variant="primary" size="md">
              투표 생성
            </Button>
          }
        >
          <VoteModal />
        </Modal>
      </header>
      <section className={styles.slider_box}>
        <Slide items={dummyData}>
          {(item) => <VoteCards title={item.name} />}
        </Slide>
      </section>
    </main>
  );
};

export default VoteSlide;
