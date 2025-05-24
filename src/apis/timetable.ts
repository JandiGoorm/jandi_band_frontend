import { ApiEndpotins } from "@/constants/endpoints";
import { useFetch, usePost } from "./hooks";
import type {
  TimeTableDetailResponse,
  TimeTableRequest,
  TimeTableResponse,
} from "@/types/timeTable";

export const usePostTimeTable = () => {
  return usePost<TimeTableRequest, TimeTableDetailResponse>(
    ApiEndpotins.MY_TIMETABLE
  );
};

export const useGetMyTimeTables = () => {
  return useFetch<TimeTableResponse>(ApiEndpotins.MY_TIMETABLE);
};
