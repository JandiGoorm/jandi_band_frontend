export type VoteStatus = {
  text: "투표중" | "투표마감";
  backgroundColor: string;
};

export const getVoteStatus = (endDatetime: Date): VoteStatus => {
  const now = new Date();
  const endDate = new Date(endDatetime);

  if (endDate > now) {
    return { text: "투표중", backgroundColor: "var(--color-bg-toast-success)" };
  } else {
    return { text: "투표마감", backgroundColor: "var(--color-error)" };
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
  color: string;
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
      text: "공연중",
      backgroundColor: "var(--color-bg-toast-success)",
      color: "var(--color-button-primary-text)",
    };
  } else if (eventDate > now) {
    return {
      text: "공연 예정",
      backgroundColor: "var(--color-white)",
      color: "var(--color-label)",
    };
  } else {
    return {
      text: "공연 종료",
      backgroundColor: "oklch(0.5929 0.1227 20.84)",
      color: "var(--color-button-primary-text)",
    };
  }
};

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export const formatISO = (iso: string) => {
  if (!iso) return "";

  const now = new Date();
  const date = new Date(iso);
  const diff = now.getTime() - date.getTime();

  if (diff < MINUTE) {
    return "방금 전";
  } else if (diff < HOUR) {
    return `${Math.floor(diff / MINUTE)}분 전`;
  } else if (diff < DAY) {
    return `${Math.floor(diff / HOUR)}시간 전`;
  } else if (diff < WEEK) {
    return `${Math.floor(diff / DAY)}일 전`;
  } else if (diff < MONTH) {
    return `${Math.floor(diff / WEEK)}주 전`;
  } else if (diff < YEAR) {
    return `${Math.floor(diff / MONTH)}달 전`;
  } else {
    return `${Math.floor(diff / YEAR)}년 전`;
  }
};
