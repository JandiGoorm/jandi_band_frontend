import { ApiEndpotins } from "@/constants/endpoints";
import { useDelete, useFetch, usePatch, usePost } from "./hooks";
import type {
  TimeTableDetailResponse,
  TimeTableRequest,
  TimeTableResponse,
  TeamTimeTableRequest,
  TeamTimeTableResponse,
} from "@/types/timeTable";
import { buildPath } from "@/utils/buildPath";

export const usePostTimeTable = () => {
  return usePost<TimeTableRequest, TimeTableDetailResponse>(
    ApiEndpotins.MY_TIMETABLE
  );
};

export const useGetMyTimeTables = () => {
  return useFetch<TimeTableResponse[]>(ApiEndpotins.MY_TIMETABLE);
};

export const useGetTimeScheduleDetail = (id: string) => {
  return useFetch<TimeTableDetailResponse>(
    buildPath(ApiEndpotins.MY_TIMETABLE_DETAIL, { id })
  );
};

export const useUpdateTimeSchedule = (id: string) => {
  return usePatch<TimeTableRequest, TimeTableDetailResponse>(
    buildPath(ApiEndpotins.MY_TIMETABLE_DETAIL, { id })
  );
};

export const useDeleteTimeSchedule = (id: string) => {
  return useDelete(buildPath(ApiEndpotins.MY_TIMETABLE_DETAIL, { id }));
};

export const usePostTeamTimeTable = (id: string) => {
  return usePost<TeamTimeTableRequest, TeamTimeTableResponse>(
    buildPath(ApiEndpotins.MY_TIMETABLE_BY_TEAM, { id })
  );
};
