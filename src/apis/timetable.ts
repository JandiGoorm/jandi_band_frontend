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
import type { QueryOptions, ApiResponse } from "./types";
import { queryClient } from "@/config/queryClient";

export const usePostTimeTable = () => {
  return usePost<TimeTableRequest, TimeTableDetailResponse>(
    ApiEndpotins.MY_TIMETABLE
  );
};

export const useGetMyTimeTables = () => {
  return useFetch<TimeTableResponse[]>(ApiEndpotins.MY_TIMETABLE);
};

export const useGetTimeScheduleDetail = (
  id: string,
  options?: QueryOptions<ApiResponse<TimeTableDetailResponse>>
) => {
  return useFetch<TimeTableDetailResponse>(
    buildPath(ApiEndpotins.MY_TIMETABLE_DETAIL, { id }),
    undefined,
    options
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

export const usePatchTeamTimeTable = (id: string) => {
  return usePatch<TeamTimeTableRequest, TeamTimeTableResponse>(
    buildPath(ApiEndpotins.MY_TIMETABLE_BY_TEAM, { id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [buildPath(ApiEndpotins.TEAM_DETAIL, { id })],
        });
      },
    }
  );
};
