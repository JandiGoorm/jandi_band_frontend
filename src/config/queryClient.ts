/* eslint-disable @typescript-eslint/no-unused-vars */
import { MutationCache, QueryClient } from "@tanstack/react-query";
import { useToastStore } from "../stores/toastStore";
import { getRandomId } from "@/utils/random";
import type { ApiResponse } from "../apis/types";
import type { AxiosResponse, AxiosError } from "axios";
import type { Nullable } from "../types/common";

let currentToastId: Nullable<string> = null;
let toastStartTime: Nullable<number> = null;
const MIN_TOAST_DURATION = 500;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },

  mutationCache: new MutationCache({
    onMutate: () => {
      // 각 mutation에 고유 ID 할당
      const toastId = getRandomId();
      currentToastId = toastId;
      toastStartTime = Date.now();
      // 로딩 토스트 표시
      useToastStore
        .getState()
        .showToast("pending", "잠시만 기다려주세요 ...", toastId);

      return { toastId };
    },
    onSuccess: (data: unknown) => {
      const response = data as AxiosResponse<ApiResponse<unknown>>;
      if (!currentToastId || !toastStartTime) return;
      const elapsedTime = Date.now() - toastStartTime;
      const remainingTime = Math.max(0, MIN_TOAST_DURATION - elapsedTime);

      try {
        // data가 undefined이면 에러로 처리
        if (!data) {
          throw new Error("응답 데이터가 없습니다.");
        }
        setTimeout(() => {
          if (currentToastId) {
            useToastStore
              .getState()
              .updateToast(
                currentToastId,
                "success",
                response.data.message ?? "성공적으로 처리되었습니다."
              );
            currentToastId = null;
            toastStartTime = null;
          }
        }, remainingTime);
      } catch (error) {
        setTimeout(() => {
          if (currentToastId) {
            useToastStore
              .getState()
              .updateToast(
                currentToastId,
                "error",
                "오류가 발생했습니다. 다시 시도해주세요."
              );
            currentToastId = null;
            toastStartTime = null;
          }
        }, remainingTime);
      }
    },
    onError: (error: unknown) => {
      if (!currentToastId || !toastStartTime) return;
      const elapsedTime = Date.now() - toastStartTime;
      const remainingTime = Math.max(0, MIN_TOAST_DURATION - elapsedTime);

      setTimeout(() => {
        if (currentToastId) {
          const axiosError = error as AxiosError<ApiResponse<unknown>>;
          const errorMessage =
            axiosError?.response?.data?.message ??
            axiosError?.message ??
            "오류가 발생했습니다. 다시 시도해주세요.";

          useToastStore
            .getState()
            .updateToast(currentToastId, "error", errorMessage);
          currentToastId = null;
          toastStartTime = null;
        }
      }, remainingTime);
    },
  }),
});
