import type { Nullable } from "./common";
import { type Range } from "./timeTable";

export type Position =
  | "VOCAL"
  | "GUITAR"
  | "BASS"
  | "DRUM"
  | "KEYBOARD"
  | "OTHER";

export interface TeamMember {
  userId: number;
  name: string;
  position: Position;
  timetableUpdatedAt: string;
  isSubmitted: boolean;
  timetableData: Nullable<Record<Range, string[]>>;
}

export interface TeamDetailResponse {
  id: number;
  name: string;
  clubId: number;
  clubName: string;
  creatorId: number;
  creatorName: string;
  members: TeamMember[];
  suggestedScheduleAt: string;
  submissionProgress: {
    submittedMember: number;
    totalMember: number;
  };
  createdAt: string;
  updatedAt: string;
}
