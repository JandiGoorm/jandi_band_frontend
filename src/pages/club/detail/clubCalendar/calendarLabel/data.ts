import type { CalendarListType } from "@/types/calendar";

export const schedules: CalendarListType = [
  {
    id: 21,
    name: "동아리일정",
    startDatetime: "2025-06-03T08:33:47",
    endDatetime: "2025-06-03T08:33:47",
    eventType: "CLUB_EVENT",
    teamId: null,
    teamName: null,
    noPosition: null,
  },
  {
    id: 8,
    name: "팀연습일정",
    startDatetime: "2025-06-03T08:34:31",
    endDatetime: "2025-06-03T08:34:31",
    eventType: "TEAM_EVENT",
    teamId: 15,
    teamName: "강세진",
    noPosition: "VOCAL",
  },
  {
    id: 22,
    name: "동아리회의",
    startDatetime: "2025-06-04T09:33:47",
    endDatetime: "2025-06-03T08:33:47",
    eventType: "CLUB_EVENT",
    teamId: null,
    teamName: null,
    noPosition: null,
  },
];
