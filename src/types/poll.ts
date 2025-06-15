export interface Poll {
  id: number;
  title: string;
  clubId: number;
  clubName: string;
  startDatetime: Date;
  endDatetime: Date;
  creatorId: number;
  creatorName: string;
  createdAt: Date;
}

export interface CreatePollRequest {
  title: string;
  clubId: number;
  endDatetime: string;
}
