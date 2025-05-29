import styles from "@/pages/vote/select/VoteSongCard.module.css";

interface VoteCountType {
  likeCount: number;
  dislikeCount: number;
  cantCount: number;
  hajjCount: number;
}

export default function VoteButton({
  likeCount,
  dislikeCount,
  cantCount,
  hajjCount,
}: VoteCountType) {
  return (
    <div className={styles.vote_emoji}>
      <button>🙆‍♀️</button>
      <span>{likeCount}</span>
      <button>🙅‍♂️</button>
      <span>{dislikeCount}</span>
      <button>😅</button>
      <span>{cantCount}</span>
      <button>👊</button>
      <span>{hajjCount}</span>
    </div>
  );
}
