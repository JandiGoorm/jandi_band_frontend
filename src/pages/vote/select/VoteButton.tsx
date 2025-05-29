import { useState } from "react";
import { usePutPoll } from "@/apis/vote";
import type { VoteCountType, VoteProps } from "@/types/vote";
import styles from "@/pages/vote/select/VoteSongCard.module.css";
import classNames from "classnames";

interface VoteButtonProps extends VoteCountType, VoteProps {
  refetch: () => void;
  // 나중에 낙관적 업데이트로 변경 예정 (리팩토링 후 지울것임)

  userVoteType: "LIKE" | "DISLIKE" | "CANT" | "HAJJ" | null;
  // 버튼 활성화를 위한 타입 정의
}

export default function VoteButton({
  likeCount,
  dislikeCount,
  cantCount,
  hajjCount,
  pollId,
  songId,
  refetch,
  userVoteType,
}: VoteButtonProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const { mutate } = usePutPoll(pollId, songId, selectedEmoji ?? "");

  // 투표 버튼 이모지에 따라 요청 보내기
  const handleVote = (emoji: string) => {
    setSelectedEmoji(emoji);

    mutate(undefined, {
      onSuccess: () => {
        console.log("성공");
        refetch();
      },
      onError: () => console.error("실패"),
    });
  };

  return (
    <div className={styles.vote_emoji}>
      <button
        className={classNames(styles.vote_button, {
          [styles.selected]: userVoteType === "LIKE",
        })}
        onClick={() => handleVote("LIKE")}
      >
        🙆‍♀️
      </button>
      <span>{likeCount}</span>
      <button
        className={classNames(styles.vote_button, {
          [styles.selected]: userVoteType === "DISLIKE",
        })}
        onClick={() => handleVote("DISLIKE")}
      >
        🙅‍♂️
      </button>
      <span>{dislikeCount}</span>
      <button
        className={classNames(styles.vote_button, {
          [styles.selected]: userVoteType === "CANT",
        })}
        onClick={() => handleVote("CANT")}
      >
        😅
      </button>
      <span>{cantCount}</span>
      <button
        className={classNames(styles.vote_button, {
          [styles.selected]: userVoteType === "HAJJ",
        })}
        onClick={() => handleVote("HAJJ")}
      >
        👊
      </button>
      <span>{hajjCount}</span>
    </div>
  );
}
