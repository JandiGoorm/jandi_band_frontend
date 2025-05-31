import { useFetch, usePatch, usePost } from "@/apis/hooks";
import { ApiEndpotins } from "@/constants/endpoints";
import type { PagiNationResponse } from "@/types/common";
import type { PromotionListResponse } from "@/types/promotion";
import { buildPath } from "@/utils/buildPath";

export const useGetPromoList = ({
  page = 0,
  size = 20,
}: {
  page?: number;
  size?: number;
}) => {
  return useFetch<PagiNationResponse<PromotionListResponse>>(
    ApiEndpotins.PROMOTION,
    { page: page, size: size }
  );
};

export const usePostPromotion = () => {
  return usePost<FormData, PromotionListResponse>(ApiEndpotins.PROMOTION);
};

export const useUpdatePromotion = (id: string) => {
  return usePatch<FormData, PromotionListResponse>(
    buildPath(ApiEndpotins.PROMOTION_DETAIL, { id })
  );
};

export const useGetPromo = (id: string) => {
  return useFetch<PromotionListResponse>(
    buildPath(ApiEndpotins.PROMOTION_DETAIL, { id })
  );
};
