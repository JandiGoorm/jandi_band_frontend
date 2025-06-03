// 동아리 일정 관련 로직들
import { ApiEndpotins } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import { useFetch } from "./hooks";
import type { CalendarListType } from "@/types/calendar";

// 캘린더 전체 일정 조회 GET
export const useGetCalendar = (clubId: number, year: number, month: number) => {
  const path = buildPath(ApiEndpotins.CALENDAR, { clubId });
  const url = `${path}?year=${year}&month=${month}`;

  return useFetch<CalendarListType>(url);
};
