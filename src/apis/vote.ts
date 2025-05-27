// 곡 투표 관련 api
import { ApiEndpotins } from "@/constants/endpoints";
import { useDelete, useFetch, useUpdate, usePost } from "./hooks";
import { buildPath } from "@/utils/buildPath";

// 투표 상세 조회 GET
export const useGetPoll = (pollId: string) => {
  return useFetch(buildPath(ApiEndpotins.POLL, { pollId }));
};

// 투표에 곡 추가 POST
export const usePostPoll = (pollId: string) => {
  return usePost(buildPath(ApiEndpotins.POLL_ADD_RECOMMEND, { pollId }));
};

// 곡에 투표하기 PUT
export const usePutPoll = (pollId: string, songId: string, emoji: string) => {
  return useUpdate(
    buildPath(ApiEndpotins.POLL_VOTE, { pollId, songId, emoji })
  );
};

// 곡 투표 취소 DELETE
export const useDeletePoll = (
  pollId: string,
  songId: string,
  emoji: string
) => {
  return useDelete(
    buildPath(ApiEndpotins.POLL_VOTE, { pollId, songId, emoji })
  );
};
