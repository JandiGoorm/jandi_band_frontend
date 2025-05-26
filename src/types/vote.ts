// 곡 투표 페이지 타입들 정의

// /api/polls/{pollId}
export interface SongType {
  id: number;
  pollId: number;
  songName: string;
  artistName: string;
  youtubeUrl: string;
  description: string | null;
  suggesterId: number;
  suggesterName: string;
  createdAt: string;
  likeCount: number;
  dislikeCount: number;
  cantCount: number;
  hajjCount: number;
  userVoteType: "LIKE" | "DISLIKE" | "CANT" | "HAJJ" | null;
}
