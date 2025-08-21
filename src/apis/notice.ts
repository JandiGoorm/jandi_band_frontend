// 공지사항 관련 api
import { ApiEndpotins } from "@/constants/endpoints";
import { useFetch } from "./hooks";
import type { NoticeRequest } from "@/types/notice";

// 공지사항 정보 조회
export const useNoticeInfo = () => {
  return useFetch<NoticeRequest>(ApiEndpotins.NOTICE);
};
