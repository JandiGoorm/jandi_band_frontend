import styles from "./style/VoteSongCard.module.css";
import profile from "./style/profile.svg";

const SongCard = () => {
  return (
    <article className={styles.song_card}>
      <header className={styles.song_title}>
        <h2>
          터치드 - <span>Hi Bully</span>
        </h2>
      </header>

      <figure className={styles.song_youtube}>유튜브 링크 썸네일</figure>

      <section className={styles.vote_section}>
        <div className={styles.user}>
          <img src={profile} />
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
  );
};

export default SongCard;
