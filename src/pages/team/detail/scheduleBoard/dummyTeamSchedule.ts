export interface PracticeSchedule {
  id: number;
  teamId: number;
  teamName: string;
  name: string;
  startDatetime: string;
  endDatetime: string;
  noPosition: string | null;
  creatorId: number;
  creatorName: string;
  createdAt: string;
  updatedAt: string;
}

export const dummyTeamSchedule: PracticeSchedule[] = [
  {
    id: 1,
    teamId: 1,
    teamName: "락밴드 A팀",
    name: "보헤미안랩소디 합주",
    startDatetime: "2024-03-15T19:00:00",
    endDatetime: "2024-03-15T21:00:00",
    noPosition: "VOCAL",
    creatorId: 1,
    creatorName: "홍길동",
    createdAt: "2024-03-15T10:30:00",
    updatedAt: "2024-03-15T10:30:00",
  },
  {
    id: 2,
    teamId: 1,
    teamName: "락밴드 A팀",
    name: "헤브유씬더레인ㅋ",
    startDatetime: "2024-03-17T18:00:00",
    endDatetime: "2024-03-17T20:00:00",
    noPosition: "GUITAR",
    creatorId: 2,
    creatorName: "강멧돌",
    createdAt: "2024-03-16T14:15:00",
    updatedAt: "2024-03-16T14:15:00",
  },
  {
    id: 3,
    teamId: 1,
    teamName: "락밴드 A팀",
    name: "Hotel California",
    startDatetime: "2024-03-20T20:00:00",
    endDatetime: "2024-03-20T22:00:00",
    noPosition: null,
    creatorId: 2,
    creatorName: "강멧돌",
    createdAt: "2024-03-18T11:00:00",
    updatedAt: "2024-03-18T11:00:00",
  },
  {
    id: 4,
    teamId: 1,
    teamName: "락밴드 A팀",
    name: "Sweet Child O' Mine",
    startDatetime: "2024-03-22T17:30:00",
    endDatetime: "2024-03-22T19:30:00",
    noPosition: "BASS",
    creatorId: 4,
    creatorName: "김응가",
    createdAt: "2024-03-21T09:00:00",
    updatedAt: "2024-03-21T09:00:00",
  },
  {
    id: 5,
    teamId: 1,
    teamName: "락밴드 A팀",
    name: "Don't Stop Believin' - Journefdfddfdfay",
    startDatetime: "2024-03-25T18:00:00",
    endDatetime: "2024-03-25T20:00:00",
    noPosition: "KEYBOARD",
    creatorId: 5,
    creatorName: "본조비",
    createdAt: "2024-03-24T13:45:00",
    updatedAt: "2024-03-24T13:45:00",
  },
];
