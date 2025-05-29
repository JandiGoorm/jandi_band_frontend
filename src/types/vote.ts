// 곡 투표 페이지 타입들 정의

// 곡 투표 생성 응답 (곡 투표의 기본 베이스)
export interface CreatePollType {
  id: number;
  title: string;
  clubId: number;
  clubName: string;
  startDatetime: string;
  endDatetime: string;
  creatorId: number;
  creatorName: string;
  createdAt: string;
}

// 곡 투표 상세 조회 /polls/{pollId}
export interface PollDetailType extends CreatePollType {
  songs: SongType[];
}

// 곡 자체의 타입들 (곡 추가, 곡 투표, 곡 투표 취소)
export interface SongType {
  id: number;
  pollId: number;
  songName: string;
  artistName: string;
  youtubeUrl: string;
  description: string | null;
  suggesterId: number;
  suggesterName: string;
  suggesterProfilePhoto: string;
  createdAt: string;
  likeCount: number;
  dislikeCount: number;
  cantCount: number;
  hajjCount: number;
  userVoteType: "LIKE" | "DISLIKE" | "CANT" | "HAJJ" | null;
}
