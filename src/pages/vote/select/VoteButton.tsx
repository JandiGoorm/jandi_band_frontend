import { useState, useEffect } from "react";
import { usePutPoll, useDeletePoll } from "@/apis/vote";
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
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(
    userVoteType
  );

  // 이름을 붙일 수 있구나..
  const { mutate: putVote } = usePutPoll(pollId, songId, selectedEmoji ?? "");
  const { mutate: deleteVote } = useDeletePoll(
    pollId,
    songId,
    selectedEmoji ?? ""
  );

  console.log(selectedEmoji);

  useEffect(() => {
    setSelectedEmoji(userVoteType);
  }, [userVoteType]);

  // 투표 버튼 이모지에 따라 요청 보내기
  const handleVote = (emoji: string) => {
    setSelectedEmoji(emoji);

    if (selectedEmoji == emoji) {
      deleteVote(undefined, {
        onSuccess: () => {
          setSelectedEmoji(null);
          refetch();
        },
        onError: () => console.error("실패했어 에러 좀 봐봐"),
      });
      return;
    }

    putVote(undefined, {
      onSuccess: () => {
        setSelectedEmoji(emoji);
        refetch();
      },
      onError: () => console.error("실패했어 에러 좀 봐봐"),
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
