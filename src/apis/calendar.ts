// 동아리 일정 관련 로직들
import { ApiEndpotins } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import { useFetch } from "./hooks";
import type { CalendarListType } from "@/types/calendar";

// 캘린더 전체 일정 조회 GET - 응답형식 정의해야함.
export const useGetPoll = (clubId: number, year: number, month: number) => {
  const path = buildPath(ApiEndpotins.CALENDAR, { clubId });
  const url = `${path}?year=${year}&month=${month}`;

  return useFetch<CalendarListType>(url);
};
