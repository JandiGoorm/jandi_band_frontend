import Button from "@/components/button/Button";
import styles from "./VoteSlide.module.css";
import Slide from "@/components/slide/Slide";
import Modal from "@/components/modal/Modal";
import VoteModal from "./modalContent/VoteModal";
import VoteCards from "@/components/cards/VoteCards";
import type { Poll } from "@/types/poll";

const VoteSlide = ({ polls }: { polls: Poll[] }) => {
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
        <Slide items={polls}>
          {(item) => <VoteCards title={item.title} id={item.id} />}
        </Slide>
      </section>
    </main>
  );
};

export default VoteSlide;
