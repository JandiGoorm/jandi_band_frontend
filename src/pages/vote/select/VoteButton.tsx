import { useState } from "react";
import { usePutPoll } from "@/apis/vote";
import type { VoteCountType, VoteProps } from "@/types/vote";
import styles from "@/pages/vote/select/VoteSongCard.module.css";

interface VoteButtonProps extends VoteCountType, VoteProps {}

export default function VoteButton({
  likeCount,
  dislikeCount,
  cantCount,
  hajjCount,
  pollId,
  songId,
}: VoteButtonProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const { mutate } = usePutPoll(pollId, songId, selectedEmoji ?? "");

  // 투표 버튼 이모지에 따라 요청 보내기
  const handleVote = (emoji: string) => {
    setSelectedEmoji(emoji);
    mutate(undefined, {
      onSuccess: () => console.log("성공"),
      onError: () => console.error("실패"),
    });
  };

  return (
    <div className={styles.vote_emoji}>
      <button onClick={() => handleVote("LIKE")}>🙆‍♀️</button>
      <span>{likeCount}</span>
      <button onClick={() => handleVote("DISLIKE")}>🙅‍♂️</button>
      <span>{dislikeCount}</span>
      <button onClick={() => handleVote("CANT")}>😅</button>
      <span>{cantCount}</span>
      <button onClick={() => handleVote("HAJJ")}>👊</button>
      <span>{hajjCount}</span>
    </div>
  );
}
