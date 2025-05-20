import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import SongCard from "@/pages/vote/select/VoteSongCard";
import { useNavigate } from "react-router-dom";
import Button from "@/components/button/Button";
import kakao from "@/pages/vote/style/kakao.svg";
import styles from "@/pages/vote/select/Vote.module.css";

const Vote = () => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <main className={styles.vote_container}>
        <header className={styles.header}>
          <h1>5월 대동제 곡 투표</h1>
          <section className={styles.button_group}>
            <Button onClick={() => navigate("/vote/result")}>결과보기</Button>
            <Button>곡 추가</Button>
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
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
        </section>
      </main>
    </DefaultLayout>
  );
};

export default Vote;
