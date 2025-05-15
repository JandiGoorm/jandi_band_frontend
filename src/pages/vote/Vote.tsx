import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./style/Vote.module.css";

const Vote = () => {
  return (
    <DefaultLayout>
      <main className={styles.vote_container}>
        <header className={styles.header}>
          <h1>5월 대동제 곡 투표</h1>
          <section className={styles.button_group}>
            <button>결과보기</button>
            <button>곡 추가</button>
            <button>공유하기</button>
          </section>
        </header>

        <section className={styles.guide}>
          아이콘을 누르면 투표됩니다. 🙆‍♀️ : 좋아요 / 🙅‍♂️ : 싫어요 / 😅 : 실력이
          부족해요 / 👊 : 하고싶진 않은데 존중해요
        </section>

        <section className={styles.songs_container}>
          <section className={styles.vote_grid}>
            <div className={styles.song_card}>노래1</div>
            <div className={styles.song_card}>노래2</div>
            <div className={styles.song_card}>노래3</div>
            <div className={styles.song_card}>노래</div>
          </section>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default Vote;
