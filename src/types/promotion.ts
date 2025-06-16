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
  isLikedByUser: boolean | null;
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

export interface CommemtResponse {
  id: number;
  promoId: number;
  description: string;
  creatorId: number;
  creatorName: string;
  creatorProfilePhoto: string;
  likeCount: number;
  isLikedByUser: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommentRequest {
  description: string;
}

export interface PromoReportRequest {
  promoId: number;
  reportReasonId: number;
  description: string;
}

export interface CommentReportRequest {
  promoCommentId: number;
  reportReasonId: number;
  description: string;
}
