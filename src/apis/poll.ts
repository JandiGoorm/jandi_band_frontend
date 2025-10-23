import { useDelete, useFetch, usePost } from "./hooks";
import { buildPath } from "@/utils/buildPath";
import type { PagiNationResponse } from "@/types/common";
import { ApiEndpotins } from "@/constants/endpoints";
import type { CreatePollRequest, Poll } from "@/types/poll";

export const useGetClubPoll = ({
  id,
  page = 0,
  size = 20,
}: {
  id: string;
  page?: number;
  size?: number;
}) => {
  return useFetch<PagiNationResponse<Poll>>(
    buildPath(ApiEndpotins.CLUB_POLL, { id }),
    { page: page, size: size }
  );
};

// 투표 생성
export const useCreatePoll = () => {
  return usePost<CreatePollRequest, Poll>(ApiEndpotins.MAKE_POLL);
};

//투표 삭제
export const useDeletePollForm = (pollId: string) => {
  return useDelete(buildPath(ApiEndpotins.POLL, { pollId }));
};
