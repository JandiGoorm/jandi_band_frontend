import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import BarChart from "../graph/BarChart";
import { useNavigate } from "react-router-dom";
import ArrowBack from "@/pages/vote/style/arrowback.svg";
import styles from "@/pages/vote/result/VoteResult.module.css";
import { usePollStore } from "@/stores/voteStore";
import Loading from "@/components/loading/Loading";
import FilterSelect from "./FilterSelect";

const VoteResult = () => {
  const navigate = useNavigate();
  const { poll } = usePollStore();

  const voteData =
    poll?.songs.map((song) => ({
      song: song.songName,
      좋아요: song.likeCount,
      별로예요: song.dislikeCount,
      실력부족: song.cantCount,
      하않존중: song.hajjCount,
    })) ?? [];

  if (!poll) return <Loading />;

  return (
    <DefaultLayout>
      <main className={styles.vote_result_container}>
        <header className={styles.header}>
          <section className={styles.vote_title}>
            <img src={ArrowBack} alt="뒤로가기" onClick={() => navigate(-1)} />
            <h1>{poll?.title}</h1>
          </section>

          <FilterSelect />
        </header>

        <BarChart data={voteData} />
      </main>
    </DefaultLayout>
  );
};

export default VoteResult;
