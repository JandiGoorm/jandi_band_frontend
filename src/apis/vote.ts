// 곡 투표 관련 api
import { ApiEndpotins } from "@/constants/endpoints";
import { useDelete, useFetch, useUpdate, usePost } from "./hooks";
import { buildPath } from "@/utils/buildPath";
import type { PollDetailType, SongType } from "@/types/vote";
import type { VoteFormData } from "@/pages/vote/select/Recommend";

// 투표 상세 조회 GET - 응답형식 PollDetailType
export const useGetPoll = (pollId: string) => {
  return useFetch<PollDetailType>(buildPath(ApiEndpotins.POLL, { pollId }));
};

// 투표에 곡 추가 POST
export const usePostPoll = (pollId: string) => {
  return usePost<VoteFormData, SongType>(
    buildPath(ApiEndpotins.POLL_ADD_RECOMMEND, { pollId })
  );
};

// 곡에 투표하기 PUT
export const usePutPoll = (pollId: number, songId: number, emoji: string) => {
  return useUpdate<undefined, SongType>(
    buildPath(ApiEndpotins.POLL_VOTE, { pollId, songId, emoji })
  );
};

// 곡 투표 취소 DELETE
export const useDeletePoll = (
  pollId: string,
  songId: string,
  emoji: string
) => {
  return useDelete<SongType>(
    buildPath(ApiEndpotins.POLL_VOTE, { pollId, songId, emoji })
  );
};
