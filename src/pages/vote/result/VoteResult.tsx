import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import BarChart from "../graph/BarChart";
import { useNavigate } from "react-router-dom";
import ArrowBack from "@/pages/vote/style/arrowback.svg";
import styles from "@/pages/vote/result/VoteResult.module.css";
import { usePollStore } from "@/stores/voteStore";
import Loading from "@/components/loading/Loading";
import FilterSelect from "./FilterSelect";
import { useState, useMemo } from "react";

const VoteResult = () => {
  const navigate = useNavigate();
  const { poll } = usePollStore();

  const [filter, setFilter] = useState("기본");

  const voteData = useMemo(() => {
    if (!poll?.songs) return [];

    const base = poll.songs.map((song) => ({
      song: song.songName,
      좋아요: song.likeCount,
      별로예요: song.dislikeCount,
      실력부족: song.cantCount,
      하않존중: song.hajjCount,
    }));

    if (filter === "좋아요") {
      return [...base].sort((a, b) => b["좋아요"] - a["좋아요"]);
    }

    if (filter === "싫어요") {
      return [...base].sort((a, b) => b["별로예요"] - a["별로예요"]);
    }

    if (filter === "묶기") {
      return [...base]
        .map((item) => {
          const 긍정 = item["좋아요"] + item["하않존중"];
          const 부정 = item["별로예요"] + item["실력부족"];
          return {
            song: item.song,
            긍정,
            부정,
          };
        })
        .sort((a, b) => b.긍정 - b.부정 - (a.긍정 - a.부정));
    }

    return base;
  }, [poll, filter]);

  // 텍스트 렌더링용
  const mostLiked = useMemo(() => {
    if (!poll?.songs || poll.songs.length === 0) return null;
    return poll.songs.reduce((max, song) =>
      song.likeCount > max.likeCount ? song : max
    );
  }, [poll]);

  const mostDisliked = useMemo(() => {
    if (!poll?.songs || poll.songs.length === 0) return null;
    return poll.songs.reduce((max, song) =>
      song.dislikeCount > max.dislikeCount ? song : max
    );
  }, [poll]);

  if (!poll) return <Loading />;

  return (
    <DefaultLayout>
      <main className={styles.vote_result_container}>
        <header className={styles.header}>
          <section className={styles.vote_title}>
            <img src={ArrowBack} alt="뒤로가기" onClick={() => navigate(-1)} />
            <h1>{poll?.title}</h1>
          </section>

          <FilterSelect onChange={setFilter} />
        </header>

        <section className={styles.summary_box}>
          {mostLiked && (
            <span>
              좋아요 1위 :{" "}
              <span className={styles.song_name}>{mostLiked.songName}</span> (
              {mostLiked.likeCount}표)
            </span>
          )}
          {mostDisliked && (
            <span>
              별로에요 1위:{" "}
              <span className={styles.song_name}>{mostDisliked.songName}</span>{" "}
              ({mostDisliked.dislikeCount}표)
            </span>
          )}
        </section>

        <BarChart
          data={voteData}
          keys={
            filter === "묶기"
              ? ["긍정", "부정"]
              : ["좋아요", "별로예요", "실력부족", "하않존중"]
          }
          filter={filter}
        />
      </main>
    </DefaultLayout>
  );
};

export default VoteResult;
