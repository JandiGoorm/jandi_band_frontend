import { useFetch } from "@/apis/hooks";
import { ApiEndpotins } from "@/constants/endpoints";
import type { PageableResponse } from "@/types/common";
import type { PromotionListResponse } from "@/types/promotion";

export const useGetPromoList = () => {
  return useFetch<PageableResponse<PromotionListResponse>>(
    ApiEndpotins.PROMOTION
  );
};
