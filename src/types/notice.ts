export interface NoticeRequest {
  id: number;
  title: string;
  content: string;
  startDatetime: string;
  endDatetime: string;
  isPaused: boolean;
  imageUrl: string;
}
