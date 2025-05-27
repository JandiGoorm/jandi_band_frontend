import type { TeamDetailResponse } from "@/types/team";

export interface PracticeTime {
  id: number;
  type: string;
  time: string;
}

export const dummyTeam: TeamDetailResponse = {
  id: 1,
  name: "뫄뫄 밴드부 A팀",
  clubId: 1,
  clubName: "뫄뫄 밴드부",
  creatorId: 6,
  creatorName: "승휘",
  members: [
    {
      userId: 6,
      name: "승휘",
      position: "VOCAL",
      timetableUpdatedAt: "2025-05-27",
      isSubmitted: true,
      timetableData: {
        Mon: ["10:00-12:00"],
        Tue: ["10:00-12:00"],
        Wed: ["10:00-12:00"],
        Thu: ["10:00-12:00"],
        Fri: ["10:00-12:00"],
        Sat: ["10:00-12:00"],
        Sun: ["10:00-12:00"],
      },
    },
    {
      userId: 7,
      name: "준호",
      position: "GUITAR",
      timetableUpdatedAt: "2025-05-27",
      isSubmitted: true,
      timetableData: null,
    },
  ],
  suggestedScheduleAt: "2025-05-27",
  submissionProgress: {
    submittedMember: 1,
    totalMember: 2,
  },
  createdAt: "2025-05-27",
  updatedAt: "2025-05-27",
};
