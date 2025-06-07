export interface PromotionListResponse {
  id: number;
  teamName: string;
  creatorId: number;
  creatorName: string;
  title: string;
  admissionFee: number;
  eventDatetime: string;
  location: string;
  address: string;
  description: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  photoUrls: string[];
  latitude: number;
  longitude: number;
}

export interface PromotionRequest {
  teamName: string;
  title: string;
  admissionFee: number;
  eventDatetime: string;
  location: string;
  address: string;
  description: string;
}
