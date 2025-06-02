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

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0-based
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  let hour = date.getHours();
  const minute = date.getMinutes();
  const isAM = hour < 12;

  const period = isAM ? "오전" : "오후";
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;

  return `${period} ${hour}시 ${minute}분`;
};

export type EventStatus = {
  text: string;
  backgroundColor: string;
};

export const getEventStatus = (eventDatetime: Date | string): EventStatus => {
  const now = new Date();
  const eventDate = new Date(eventDatetime);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDay = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth(),
    eventDate.getDate()
  );

  if (eventDay.getTime() === today.getTime()) {
    return {
      text: "D-Day",
      backgroundColor: "var(--color-bg-toast-success)",
    };
  } else if (eventDate > now) {
    return {
      text: "공연 예정",
      backgroundColor: "var(--color-bg-button)",
    };
  } else {
    return {
      text: "공연 종료",
      backgroundColor: "var(--color-bg-toast-error)",
    };
  }
};
