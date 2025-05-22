export interface ClubListResponse {
  id: number;
  name: string;
  universityName: string | null;
  isUnionClub: boolean;
  photoUrl: string | null;
  memberCount: number;
}
