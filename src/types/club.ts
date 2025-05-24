import type { Nullable } from "./common";
import type { University } from "./univ";

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
