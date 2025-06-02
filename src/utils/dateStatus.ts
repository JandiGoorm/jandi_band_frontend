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

export const formatPromotionDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const period = hours >= 12 ? "PM" : "AM";
  if (hours === 0) {
    hours = 12; // 자정 처리
  } else if (hours > 12) {
    hours = hours - 12;
  }

  return `${year}.${month}.${day} ${period} ${hours}:${minutes}`;
};
