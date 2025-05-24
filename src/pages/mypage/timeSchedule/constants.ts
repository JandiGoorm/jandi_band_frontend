import z from "zod";

export const timeTableSchema = z.object({
  name: z
    .string()
    .nonempty("시간표 이름을 입력해주세요")
    .min(2, "2자 이상 입력해주세요")
    .max(10, "10자 이하로 입력해주세요"),
  timetableData: z.object({
    Mon: z.array(z.string()),
    Tue: z.array(z.string()),
    Wed: z.array(z.string()),
    Thu: z.array(z.string()),
    Fri: z.array(z.string()),
    Sat: z.array(z.string()),
    Sun: z.array(z.string()),
  }),
});
