// 캘린더 타입 정의
export type EventType = "CLUB_EVENT" | "TEAM_EVENT";

export interface CalendarEvent {
  id: number;
  name: string;
  startDatetime: string; // ISO 8601 string
  endDatetime: string;
  eventType: EventType;
  teamId: number | null;
  teamName: string | null;
  noPosition: string | null; // "VOCAL"
}

// 응답 타입
export type CalendarListType = CalendarEvent[];

// 일정 추가 타입 정의
export interface ClubEventFormData {
  name: string;
  startDatetime: string;
  endDatetime: string;
}

// 응답 타입
export interface ClubEventType extends ClubEventFormData {
  id: number;
}

// 동아리 응답 타입
export interface PracticeSchedule {
  id: number;
  teamId: number;
  teamName: string;
  name: string;
  startDatetime: string;
  endDatetime: string;
  noPosition: string | null;
  creatorId: number;
  creatorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface TeamScheduleResponse {
  content: PracticeSchedule[];
  pageInfo: PageInfo;
}

// 동아리 post 타입
export interface TeamScheduleFormData {
  name: string;
  startDatetime: string;
  endDatetime: string;
  noPosition: string | null;
}
