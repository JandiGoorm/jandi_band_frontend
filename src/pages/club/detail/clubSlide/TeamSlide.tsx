import Button from "@/components/button/Button";
import styles from "./TeamSlide.module.css";
import Slide from "@/components/slide/Slide";
import Modal from "@/components/modal/Modal";
import TeamModal from "./modalContent/TeamModal";
import TeamCards from "@/components/cards/TeamCards";
import type { TeamBasicResponse } from "@/types/team";

const TeamSlide = ({ teams }: { teams: TeamBasicResponse[] | undefined }) => {
  if (teams === undefined) return;

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
        <Slide items={teams}>
          {(item) => <TeamCards title={item.name} id={item.id} />}
        </Slide>
      </section>
    </main>
  );
};

export default TeamSlide;
