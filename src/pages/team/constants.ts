export interface Team {
  name: string;
  members: Member[];
  practiceTime: PracticeTime[];
  link: string;
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
  link: "https://discord.gg/9mYEsR8D",
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
