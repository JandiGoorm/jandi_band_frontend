export interface TeamResponse {
  id: string;
  name: string;
  club: TeamClubInfo;
  creator: CreatorInfo;
  members: TeamMember[];
  memberCount: number;
  createdAt: string; // or `Date` if you parse it
  updatedAt: string;
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
