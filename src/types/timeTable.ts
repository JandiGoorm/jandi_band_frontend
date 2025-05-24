export type Range = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface TimeTableResponse {
  id: number;
  name: string;
}

export interface TimeTableDetailResponse {
  id: string;
  name: string;
  timetableData: Record<Range, string[]>;
}

export interface TimeTableRequest {
  name: string;
  timetableData: Record<Range, string[]>;
}
