// 마이페이지 관련 api
import { ApiEndpotins } from "@/constants/endpoints";
import { useFetch, usePatch } from "./hooks";

// 내 정보 조회
export const useGetInfo = () => {
  return useFetch(ApiEndpotins.ME);
};

// 내 정보 수정
export const usePatchInfo = () => {
  return usePatch(ApiEndpotins.ME);
};
