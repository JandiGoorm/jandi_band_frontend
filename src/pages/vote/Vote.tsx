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

        <section className={styles.vote_grid}>
          <article className={styles.song_card}>
            <header>
              <h2>
                터치드 - <span>Hi Bully</span>
              </h2>
            </header>

            <figure>유튜브 링크 썸네일</figure>

            <section>
              <div className={styles.user}>
                <p>img 프로필사진</p>
                <span>강세진</span>
              </div>
              <div className={styles.vote_emoji}>
                <button>🙆‍♀️</button>
                <span>10</span>
                <button>🙆‍♀️</button>
                <span>10</span>
                <button>🙆‍♀️</button>
                <span>10</span>
                <button>🙆‍♀️</button>
                <span>10</span>
              </div>
            </section>

            <footer>
              <p>기타 솔로가 야무져서 해보고 싶었어요.</p>
            </footer>
          </article>

          <article className={styles.song_card}>노래2</article>
          <article className={styles.song_card}>노래3</article>
          <article className={styles.song_card}>노래</article>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default Vote;
