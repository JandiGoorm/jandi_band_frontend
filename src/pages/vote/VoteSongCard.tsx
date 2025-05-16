import styles from "./style/VoteSongCard.module.css";
import profile from "./style/profile.svg";

const SongCard = () => {
  // 유튜브 임베드 링크로 바꾸는 함수. youtu.be/뒤가 영상 아이디라고 하네요
  // url 객체를 사용했습니다.
  const changeToEmbed = (url: string): string => {
    const parsedUrl = new URL(url);
    const videoId = parsedUrl.pathname.slice(1); // /sgIwf
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // 사용자가 입력한 url
  const url = "https://youtu.be/sgIWiMtuw4c?si=6Jjx1TunrgzPqmJn";
  const embedUrl = changeToEmbed(url);

  return (
    <article className={styles.song_card}>
      <header className={styles.song_title}>
        <h2>
          터치드 - <span>Hi Bully</span>
        </h2>
      </header>

      <figure className={styles.song_youtube}>
        <iframe width="100%" height="100%" src={embedUrl} allowFullScreen />
      </figure>

      <section className={styles.vote_section}>
        <div className={styles.user}>
          <img src={profile} />
          <span>강세진진자라</span>
        </div>

        <div className={styles.vote_emoji}>
          <button>🙆‍♀️</button>
          <span>10</span>
          <button>🙅‍♂️</button>
          <span>10</span>
          <button>😅</button>
          <span>10</span>
          <button>👊</button>
          <span>10</span>
        </div>
      </section>

      <footer className={styles.vote_reason}>
        <p>기타 솔로가 야무져서 해보고 싶었어요.</p>
      </footer>
    </article>
  );
};

export default SongCard;
