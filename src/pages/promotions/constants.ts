export interface Promotion {
  id: number;
  img: string;
  title: string;
  time: string;
  destination: string;
}

export interface Comment {
  id: number;
  name: string;
  time: string;
  content: string;
}

export const promotionItems: Promotion[] = [
  {
    id: 1,
    img: `/promotion1.png`,
    title: "동아리 정기공연1",
    time: "2025.03.17 PM 6:00",
    destination: "서울, 뫄뫄 공연장",
  },
  {
    id: 2,
    img: `/promotion2.png`,
    title: "동아리 정기공연2",
    time: "2025.03.17 PM 6:00",
    destination: "서울, 뫄뫄 공연장",
  },
  {
    id: 3,
    img: `/promotion3.png`,
    title: "동아리 정기공연3",
    time: "2025.03.17 PM 6:00",
    destination: "서울, 뫄뫄 공연장",
  },
  {
    id: 4,
    img: `/promotion2.png`,
    title: "동아리 정기공연4",
    time: "2025.03.17 PM 6:00",
    destination: "서울, 뫄뫄 공연장",
  },
  {
    id: 5,
    img: `/promotion1.png`,
    title: "동아리 정기공연5",
    time: "2025.03.17 PM 6:00",
    destination: "서울, 뫄뫄 공연장",
  },
  {
    id: 6,
    img: `/promotion3.png`,
    title: "동아리 정기공연6",
    time: "2025.03.17 PM 6:00",
    destination: "서울, 뫄뫄 공연장",
  },
];

export const commentItems: Comment[] = [
  {
    id: 1,
    name: "강세진",
    content: "기대가 됩니다~ 응원해요",
    time: "2025-03-08 18:34",
  },
  {
    id: 2,
    name: "강세진",
    content: "기대가 됩니다~",
    time: "2025-03-08 18:34",
  },
  {
    id: 3,
    name: "강세진",
    content: "응원해요",
    time: "2025-03-08 18:34",
  },
];
