export interface Poll {
  id: string;
  title: string;
  clubId: number;
  clubName: string;
  startDatetime: Date;
  endDatetime: Date;
  creatorId: number;
  creatorName: string;
  createdAt: Date;
}
