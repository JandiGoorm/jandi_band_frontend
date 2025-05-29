import Button from "@/components/button/Button";
import styles from "./VoteSlide.module.css";
import Slide from "@/components/slide/Slide";
import Modal from "@/components/modal/Modal";
import VoteModal from "./modalContent/VoteModal";
import VoteCard from "@/components/cards/VoteCard";
import type { Poll } from "@/types/poll";
import { useNavigate, useParams } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";

const VoteSlide = ({
  polls,
  isMember,
  refetch,
}: {
  polls: Poll[];
  isMember: boolean;
  refetch: () => void;
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div
          className={styles.title_box}
          onClick={() =>
            navigate(buildPath(PageEndpoints.CLUB_VOTE_LIST, { id: id! }))
          }
        >
          <p className={styles.title}>곡 투표 목록</p>
          <p className={styles.more}>더보기</p>
        </div>
        {isMember && (
          <Modal
            title="곡 투표 생성하기"
            trigger={
              <Button variant="primary" size="md">
                투표 생성
              </Button>
            }
          >
            {(setOpen) => <VoteModal setOpen={setOpen} refetch={refetch} />}
          </Modal>
        )}
      </header>
      <section className={styles.slider_box}>
        <Slide<Poll> items={polls}>{(item) => <VoteCard item={item} />}</Slide>
      </section>
    </main>
  );
};

export default VoteSlide;
