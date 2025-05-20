export interface Team {
  name: string;
  members: Member[];
  practiceTime: PracticeTime[];
}

export type Position = "Guitar" | "Keyboard" | "Vocal" | "Drum" | "Bass";

export interface Member {
  id: number;
  name: string;
  position: Position;
}

export interface PracticeTime {
  id: number;
  type: string;
  time: string;
}

export const dummyTeam: Team = {
  name: "뫄뫄 밴드부 A팀",
  members: [
    {
      id: 1,
      name: "김땡떙",
      position: "Guitar",
    },
    {
      id: 2,
      name: "김땡땡",
      position: "Keyboard",
    },
    {
      id: 3,
      name: "김땡땡",
      position: "Vocal",
    },
    {
      id: 4,
      name: "김땡땡",
      position: "Drum",
    },
    {
      id: 5,
      name: "김땡떙",
      position: "Guitar",
    },
    {
      id: 6,
      name: "김땡땡",
      position: "Bass",
    },
  ],
  practiceTime: [
    {
      id: 1,
      type: "전체",
      time: "07월 28일 13시~15시",
    },
    {
      id: 2,
      type: "보컬 제외",
      time: "07월 28일 13시~15시",
    },
    {
      id: 3,
      type: "드럼 제외",
      time: "07월 28일 13시~15시",
    },
  ],
};

export type Range = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export const range: Range[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const timeRange = {
  startTime: 7,
  endTime: 23,
};

export const availableTimeSlots: Record<Range, string[]> = {
  Mon: ["22:30", "23:00"],
  Tue: [
    "08:30",
    "09:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
  ],
  Wed: [
    "07:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
  ],
  Thu: [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "16:00",
    "16:30",
    "17:00",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
  ],
  Fri: [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
  ],
  Sat: [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
  ],
  Sun: [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "16:00",
    "16:30",
    "17:00",
    "19:00",
    "19:30",
    "23:30",
  ],
};
