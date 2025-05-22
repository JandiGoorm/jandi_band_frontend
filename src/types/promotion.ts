export interface PromotionListResponse {
  id: number;
  clubId: number;
  clubName: string;
  creatorId: number;
  creatorName: string;
  title: string;
  admissionFee: number;
  eventDatetime: string;
  location: string;
  address: string;
  description: string;
  status: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  photoUrls: string[];
}
