import { z } from "zod";

export const teamCreateFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "팀 이름을 입력하세요." })
    .max(20, { message: "이름은 20자 이내로 입력해주세요." }),
  // member: z
  //   .string({ required_error: "멤버를 선택하세요." })
  //   .min(1, { message: "멤버를 선택하세요." }),
});

export const voteCreateFormSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "투표 제목을 입력하세요." })
    .max(20, { message: "제목은 20자 이내로 입력해주세요." }),
  endtime: z.coerce
    .date({
      required_error: "투표 마감시간을 선택하세요.",
      invalid_type_error: "올바른 날짜와 시간을 선택하세요.",
    })
    .refine((date) => date > new Date(), {
      message: "마감시간은 현재 시각 이후여야 합니다.",
    }),
});

export const photoCreateFormSchema = z.object({
  photo: z.custom<FileList>(
    (files) => {
      return files instanceof FileList && files.length > 0;
    },
    {
      message: "사진을 하나 이상 선택해주세요.",
    }
  ),
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
