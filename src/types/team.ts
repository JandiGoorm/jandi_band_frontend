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

export interface TeamResponse {
  id: number;
  name: string;
  club: TeamClubInfo;
  creator: CreatorInfo;
  members: TeamMember[];
  memberCount: number;
  createdAt: string; // or `Date` if you parse it
  updatedAt: string;
}

export interface TeamBasicResponse {
  id: number;
  name: string;
  creatorId: number;
  creatorName: string;
  memberCount: number;
  createdAt: string;
}

export interface TeamClubInfo {
  clubId: number;
  name: string;
}

export interface CreatorInfo {
  userId: number;
  name: string;
}

export interface MyTeamInfo {
  id: number;
  name: string;
  description: string;
  clubId: number;
  clubName: string;
  creatorId: number;
  creatorName: string;
  joinedAt: string;
  createdAt: string;
  memberCount: number;
}
