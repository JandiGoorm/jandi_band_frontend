import { ApiEndpotins } from "@/constants/endpoints";
import type { LoginResponse, SignUpData, UserInfo } from "@/types/auth";
import { useFetch, usePost } from "./hooks";

/**
 * 카카오 로그인으로 발급받은 코드를 통해 로그인
 * @param code 카카오 로그인 코드
 * @returns
 */
export const useSignIn = (code: string) => {
  return useFetch<LoginResponse>(
    ApiEndpotins.SIGN_IN,
    {
      code,
    },
    {
      enabled: !!code, // boolean 타입으로 변환
    }
  );
};

// 회원 가입
export const useSignUp = () => {
  return usePost<SignUpData, UserInfo>(ApiEndpotins.SIGN_UP);
};

// 내 프로필 조회
export const useGetMe = () => {
  return useFetch<UserInfo>(ApiEndpotins.ME);
};
