// 동아리 일정 관련 로직들
import { ApiEndpotins } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import { useFetch, usePost, useDelete } from "./hooks";
import type {
  CalendarListType,
  ClubEventFormData,
  ClubEventType,
} from "@/types/calendar";

// 캘린더 전체 일정 조회 GET
export const useGetCalendar = (clubId: number, year: number, month: number) => {
  const path = buildPath(ApiEndpotins.CALENDAR, { clubId });
  // const url = `${path}?year=${year}&month=${month}`;

  // return useFetch<CalendarListType>(url);
  const params = { year, month };

  return useFetch<CalendarListType>(path, params);
};

// 동아리 일정 추가 POST
export const usePostCalendarEvent = (clubId: number) => {
  return usePost<ClubEventFormData, ClubEventType>(
    buildPath(ApiEndpotins.POST_CALENDAR_EVENT, { clubId })
  );
};

// 동아리 일정 삭제 DELETE, 경로 파라미터로만 들어감
export const useDeleteCalendarEvent = (clubId: number, eventId: number) => {
  return useDelete(
    buildPath(ApiEndpotins.DELETE_CALENDAR_EVENT, { clubId, eventId })
  );
};
