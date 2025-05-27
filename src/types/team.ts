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
export interface TeamMember {
  userId: number;
  name: string;
  position: string;
}

export interface TeamClubInfo {
  clubId: number;
  name: string;
}

export interface CreatorInfo {
  userId: number;
  name: string;
}
