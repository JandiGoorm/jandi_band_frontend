import type { Nullable } from "./common";
import type { University } from "./univ";
export interface ClubListResponse {
  id: number;
  name: string;
  universityName: string | null;
  isUnionClub: boolean;
  photoUrl: string | null;
  memberCount: number;
}

export interface ClubDetailResponse {
  chatroomUrl: string;
  description: string;
  id: string;
  instagramId: string;
  isUnionClub: boolean;
  memberCount: number;
  name: string;
  photoUrl: Nullable<string>;
  university: University;
  createdAt: string;
  updatedAt: string;
}
