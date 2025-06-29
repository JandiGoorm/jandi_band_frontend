import { useEffect } from "react";
import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import SongCard from "@/pages/vote/select/VoteSongCard";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPoll } from "@/apis/vote";
import { usePollStore } from "@/stores/voteStore";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";
import Recommend from "@/pages/vote/select/Recommend";
import kakao from "@/pages/vote/style/kakao.svg";
import styles from "@/pages/vote/select/Vote.module.css";
import Loading from "@/components/loading/Loading";

import ArrowBack from "@/pages/vote/style/arrowback.svg";

const Vote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetPoll(id!);
  const { poll, setPoll } = usePollStore();

  useEffect(() => {
    if (data?.data) {
      setPoll(data.data);
    }
  }, [data, setPoll]);

  if (isLoading || !poll) return <Loading />;

  return (
    <DefaultLayout>
      <main className={styles.vote_container}>
        <header className={styles.header}>
          <div className={styles.header_box}>
            <img
              src={ArrowBack}
              alt="뒤로가기"
              onClick={() =>
                navigate(buildPath(PageEndpoints.CLUB, { id: poll.clubId }))
              }
              className={styles.back_button}
            />
            <h1>{poll.title}</h1>
          </div>
          <section className={styles.button_group}>
            <Button
              onClick={() =>
                navigate(buildPath(PageEndpoints.VOTE_RESULT, { id: id! }))
              }
            >
              결과보기
            </Button>
            <Modal title="곡 추천하기" trigger={<Button>곡 추가</Button>}>
              {(setOpen) => (
                <Recommend
                  setOpen={setOpen}
                  refetch={refetch}
                  existingSongs={poll.songs.map((s) => ({
                    songName: s.songName,
                    artistName: s.artistName,
                  }))}
                />
              )}
            </Modal>
            <Button
              className={styles.share}
              onClick={() => {
                if (!window.Kakao || !poll?.id) return;

                const voteId = poll.id;
                const templateId = 121498;

                window.Kakao.Link.sendCustom({
                  templateId,
                  templateArgs: {
                    voteId: String(voteId),
                  },
                });
              }}
            >
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
            <SongCard
              key={song.id}
              song={song}
              pollId={poll.id}
              refetch={refetch}
            />
          ))}
        </section>
      </main>
    </DefaultLayout>
  );
};

export default Vote;
