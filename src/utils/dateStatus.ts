export type VoteStatus = {
  text: "투표중" | "투표마감";
  backgroundColor: string;
};

export const getVoteStatus = (endDatetime: Date): VoteStatus => {
  const now = new Date();
  const endDate = new Date(endDatetime);

  if (endDate > now) {
    return { text: "투표중", backgroundColor: "var(--color-bg-toast-success)" }; // 초록색 예시
  } else {
    return { text: "투표마감", backgroundColor: "var(-color-bg-toast-error)" }; // 빨간색 예시
  }
};
