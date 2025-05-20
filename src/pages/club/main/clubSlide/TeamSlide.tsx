import Button from "@/components/button/Button";
import styles from "./TeamSlide.module.css";
import Slide from "@/components/slide/Slide";
import Modal from "@/components/modal/Modal";
import TeamModal from "./modalContent/TeamModal";

const dummyData = [
  { id: 1, name: "Slide 1" },
  { id: 2, name: "Slide 2" },
  { id: 3, name: "Slide 3" },
  { id: 4, name: "Slide 4" },
];
const TeamSlide = () => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>팀 목록</div>
        <Modal
          title="팀 생성하기"
          trigger={
            <Button variant="primary" size="md">
              팀 생성
            </Button>
          }
        >
          <TeamModal />
        </Modal>
      </header>
      <section className={styles.slider_box}>
        <Slide items={dummyData}>
          {(item) => {
            return <div>{item.name}</div>;
          }}
        </Slide>
      </section>
    </main>
  );
};

export default TeamSlide;
