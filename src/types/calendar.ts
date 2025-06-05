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
