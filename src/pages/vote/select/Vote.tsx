import { useEffect } from "react";
import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import SongCard from "@/pages/vote/select/VoteSongCard";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPoll } from "@/apis/vote";
import { usePollStore } from "@/stores/voteStore";
import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";
import Recommend from "@/pages/vote/select/Recommend";
import kakao from "@/pages/vote/style/kakao.svg";
import styles from "@/pages/vote/select/Vote.module.css";

const Vote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetPoll(id!);
  const { poll, setPoll } = usePollStore();

  useEffect(() => {
    if (data?.data) {
      setPoll(data.data);
    }
  }, [data, setPoll]);

  if (isLoading || !poll) return <div>데이터가 존재하지 않음</div>;

  return (
    <DefaultLayout>
      <main className={styles.vote_container}>
        <header className={styles.header}>
          <h1>{poll.title}</h1>
          <section className={styles.button_group}>
            <Button onClick={() => navigate(`/vote/${id}/result`)}>
              결과보기
            </Button>
            <Modal title="곡 추천하기" trigger={<Button>곡 추가</Button>}>
              <Recommend />
            </Modal>
            <Button className={styles.share}>
              <img src={kakao} />
              공유하기
            </Button>
          </section>
        </header>

        <section className={styles.guide}>
          아이콘을 누르면 투표됩니다. 🙆‍♀️ : 좋아요 / 🙅‍♂️ : 싫어요 / 😅 : 실력이
          부족해요 / 👊 : 하고싶진 않은데 존중해요
        </section>

        <section className={styles.vote_grid}>
          {poll.songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </section>
      </main>
    </DefaultLayout>
  );
};

export default Vote;
