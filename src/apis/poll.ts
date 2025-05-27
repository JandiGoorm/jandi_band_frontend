import { useFetch, usePost } from "./hooks";
import { buildPath } from "@/utils/buildPath";
import { ApiEndpotins } from "@/constants/endpoints";
import type { CreatePollRequest, Poll } from "@/types/poll";
import type { PageableResponse } from "@/types/common";

// 클럽별 투표 목록 조회
export const useGetClubPoll = (id: string) => {
  return useFetch<PageableResponse<Poll>>(
    buildPath(ApiEndpotins.CLUB_POLL, { id })
  );
};

// 투표 생성
export const useCreatePoll = () => {
  return usePost<CreatePollRequest, Poll>(ApiEndpotins.MAKE_POLL);
};
