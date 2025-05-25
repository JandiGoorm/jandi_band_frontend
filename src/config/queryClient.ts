import { MutationCache, QueryClient } from "@tanstack/react-query";
import { useToastStore } from "../stores/toastStore";
import { getRandomId } from "@/utils/random";
import type { ApiResponse } from "../apis/types";
import type { AxiosResponse } from "axios";
import type { Nullable } from "../types/common";

let currentToastId: Nullable<string> = null;
let toastStartTime: Nullable<number> = null;
const MIN_TOAST_DURATION = 1000;

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
      useToastStore.getState().showToast("pending", "처리 중...", toastId);

      return { toastId };
    },
    onSuccess: (data: unknown) => {
      const response = data as AxiosResponse<ApiResponse<unknown>>;
      if (!currentToastId || !toastStartTime) return;

      // 경과 시간 계산
      const elapsedTime = Date.now() - toastStartTime;
      const remainingTime = Math.max(0, MIN_TOAST_DURATION - elapsedTime);

      // 최소 지속 시간까지 대기
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
    },
    onError: (error) => {
      if (!currentToastId || !toastStartTime) return;

      // 경과 시간 계산
      const elapsedTime = Date.now() - toastStartTime;
      const remainingTime = Math.max(0, MIN_TOAST_DURATION - elapsedTime);

      // 최소 지속 시간까지 대기
      setTimeout(() => {
        if (currentToastId) {
          useToastStore
            .getState()
            .updateToast(
              currentToastId,
              "error",
              error instanceof Error ? error.message : "오류가 발생했습니다."
            );
          currentToastId = null;
          toastStartTime = null;
        }
      }, remainingTime);
    },
  }),
});
