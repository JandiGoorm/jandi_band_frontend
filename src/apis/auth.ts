import { ApiEndpotins } from "@/constants/endpoints";
import { useFetch } from "./hooks";
import type { LoginResponse } from "@/types/auth";
import type { ApiResponse } from "./types";

export const useLogin = (params: object) => {
  return useFetch<ApiResponse<LoginResponse>>(ApiEndpotins.SIGN_IN, params, {
    enabled: !!params, // boolean 타입으로 변환
  });
};
