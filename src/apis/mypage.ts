// 마이페이지 관련 api
import { ApiEndpotins } from "@/constants/endpoints";
import { useFetch, usePatch } from "./hooks";
import type { MyInfo } from "@/types/mypage";

// 내 정보 조회
export const useGetInfo = () => {
  return useFetch<MyInfo>(ApiEndpotins.ME);
};

// 내 정보 수정
export const usePatchInfo = () => {
  return usePatch(ApiEndpotins.ME);
};
