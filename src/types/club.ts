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
  representativeId: number;
  createdAt: string;
  updatedAt: string;
}

export interface MyClubListResponse {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
  universityName: string;
  myRole: string;
  joinedAt: string;
  memberCount: number;
  unionClub: boolean;
}
export interface ClubMemberResponse {
  id: number;
  members: Member[];
  vocalCount: number;
  guitarCount: number;
  keyboardCount: number;
  bassCount: number;
  drumCount: number;
  totalMemberCount: number;
}

export interface Member {
  userId: number;
  name: string;
  position: string;
}
