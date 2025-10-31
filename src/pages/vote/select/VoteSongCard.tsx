import { changeToEmbed } from "@/pages/vote/embed";
import VoteButton from "@/pages/vote/select/VoteButton";
import styles from "@/pages/vote/select/VoteSongCard.module.css";
import type { SongType } from "@/types/vote.ts";
import close from "/public/modal_cancle_black.svg";
import { useDeleteSong } from "@/apis/vote";
import DeleteModal from "@/components/modal/deleteModal/DeleteModal";
import { useAuthStore } from "@/stores/authStore";

interface SongCardProps {
  song: SongType;
  pollId: number;
  refetch: () => void;
}

const SongCard = ({ song, pollId, refetch }: SongCardProps) => {
  // 사용자가 입력한 url
  const embedUrl = changeToEmbed(song.youtubeUrl);
  const { mutate: deleteSong } = useDeleteSong(pollId, song.id);
  const { user } = useAuthStore();

  const mine = user?.id === song.suggesterId;
  return (
    <article className={styles.song_card}>
      {mine ? (
        <div className={styles.song_head}>
          <header>
            <h2>
              {song.artistName} - <span>{song.songName}</span>
            </h2>
          </header>
          <DeleteModal
            trigger={<img src={close} alt="삭제" />}
            title="곡 삭제"
            description="정말 해당 곡을 삭제 하시겠어요?"
            onDelete={() => {
              deleteSong(undefined, {
                onSuccess: () => {
                  refetch();
                },
              });
            }}
          />
        </div>
      ) : (
        <header className={styles.song_title}>
          <h2>
            {song.artistName} - <span>{song.songName}</span>
          </h2>
        </header>
      )}

      <figure className={styles.song_youtube}>
        {embedUrl && (
          <iframe width="100%" height="100%" src={embedUrl} allowFullScreen />
        )}
      </figure>
      <section className={styles.vote_section}>
        <div className={styles.user}>
          <img src={song.suggesterProfilePhoto} />
          <span>{song.suggesterName}</span>
        </div>

        <VoteButton
          likeCount={song.likeCount}
          dislikeCount={song.dislikeCount}
          cantCount={song.cantCount}
          hajjCount={song.hajjCount}
          pollId={pollId}
          songId={song.id}
          refetch={refetch}
          userVoteType={song.userVoteType}
        />
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
