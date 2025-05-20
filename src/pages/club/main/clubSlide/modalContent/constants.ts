import { z } from "zod";

export const teamCreateFormSchema = z.object({
  title: z.string({ required_error: "팀 이름을 입력하세요." }),
  university: z
    .string({ required_error: "대학을 선택하세요." })
    .min(1, { message: "대학을 선택하세요." }),
  member: z
    .string({ required_error: "멤버를 선택하세요." })
    .min(1, { message: "멤버를 선택하세요." }),
});

export const universities = [
  "서울대학교",
  "연세대학교",
  "고려대학교",
  "서강대학교",
  "한양대학교",
  "성균관대학교",
  "한국외국어대학교",
  "이화여자대학교",
  "경희대학교",
  "중앙대학교",
  "광운대학교",
  "국민대학교",
  "덕성여자대학교",
  "동국대학교",
  "세종대학교",
  "숭실대학교",
  "서울시립대학교",
  "한국과학기술원",
  "포항공과대학교",
  "광주과학기술원",
];

export const members = [
  "강이름",
  "전이름",
  "한이름",
  "윤이름",
  "김이름",
  "이이름",
  "박이름",
  "오이름",
];
