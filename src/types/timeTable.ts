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

export interface TeamTimeTableRequest {
  timetableData: Record<Range, string[]>;
}

export interface TeamTimeTableResponse {
  userId: number;
  teamId: number;
  timetableData: Record<Range, string[]>;
  updatedTimetableAt: string;
}
