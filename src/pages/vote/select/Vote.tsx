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
import { useAuthStore } from "@/stores/authStore";
import DeleteModal from "@/components/modal/deleteModal/DeleteModal";
import { useDeletePollForm } from "@/apis/poll";

const Vote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetPoll(id!);
  const { mutate: deleteVote } = useDeletePollForm(id || "");
  const { poll, setPoll } = usePollStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (data?.data) {
      setPoll(data.data);
    }
  }, [data, setPoll]);
  const mine = user?.id === data?.data.creatorId;

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
        <section className={styles.footer_button_container}>
          {mine && (
            <DeleteModal
              trigger={
                <Button size="md" variant="primary">
                  투표 삭제
                </Button>
              }
              title="투표 삭제"
              description="정말 해당 투표를 삭제 하시겠어요?"
              onDelete={() => {
                deleteVote(undefined, {
                  onSuccess: () => {
                    navigate(
                      buildPath(PageEndpoints.CLUB, { id: poll.clubId })
                    );
                  },
                });
              }}
            />
          )}
        </section>
      </main>
    </DefaultLayout>
  );
};

export default Vote;
