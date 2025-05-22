import { useFetch } from "@/apis/hooks";
import type { ApiResponse } from "@/apis/types";
import { ApiEndpotins } from "@/constants/endpoints";
import type { PageableResponse } from "@/types/common";
import type { PromotionListResponse } from "@/types/promotion";

export const useGetPromoList = () => {
  return useFetch<ApiResponse<PageableResponse<PromotionListResponse>>>(
    ApiEndpotins.PROMOTION
  );
};
