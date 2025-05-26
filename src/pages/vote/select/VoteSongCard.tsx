import { changeToEmbed } from "@/pages/vote/embed";
import styles from "@/pages/vote/select/VoteSongCard.module.css";
import profile from "../style/profile.svg";
import type { SongType } from "@/types/vote.ts";

interface SongCardProps {
  song: SongType;
}

const SongCard = ({ song }: SongCardProps) => {
  // 사용자가 입력한 url (공유하기로 입력했을 경우)
  const embedUrl = changeToEmbed(song.youtubeUrl);

  return (
    <article className={styles.song_card}>
      <header className={styles.song_title}>
        <h2>
          {song.artistName} - <span>{song.songName}</span>
        </h2>
      </header>

      <figure className={styles.song_youtube}>
        {embedUrl && (
          <iframe width="100%" height="100%" src={embedUrl} allowFullScreen />
        )}
      </figure>

      <section className={styles.vote_section}>
        <div className={styles.user}>
          <img src={profile} />
          <span>{song.suggesterName}</span>
        </div>

        <div className={styles.vote_emoji}>
          <button>🙆‍♀️</button>
          <span>{song.likeCount}</span>
          <button>🙅‍♂️</button>
          <span>{song.dislikeCount}</span>
          <button>😅</button>
          <span>{song.cantCount}</span>
          <button>👊</button>
          <span>{song.hajjCount}</span>
        </div>
      </section>

      {song.description && (
        <footer className={styles.vote_reason}>
          <p>{song.description}</p>
        </footer>
      )}
    </article>
  );
};

export default SongCard;
