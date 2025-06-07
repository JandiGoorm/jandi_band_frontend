import { useDelete, useFetch, usePatch, usePost } from "@/apis/hooks";
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

export const useDeletePromo = (id: string) => {
  return useDelete(buildPath(ApiEndpotins.PROMOTION_DETAIL, { id }));
};

export const usePromoisLike = (id: string) => {
  return useFetch<boolean>(buildPath(ApiEndpotins.PROMOTION_ISLIKE, { id }));
};

export const usePromoLike = (id: string) => {
  return usePost(buildPath(ApiEndpotins.PROMOTION_LIKE, { id }));
  
export const useGetPromoMap = ({
  startLatitude = 1,
  startLongitude = 1,
  endLatitude = 1,
  endLongitude = 1,
  page = 0,
  size = 20,
}: {
  startLatitude?: number;
  startLongitude?: number;
  endLatitude?: number;
  endLongitude?: number;
  page?: number;
  size?: number;
}) => {
  return useFetch<PagiNationResponse<PromotionListResponse>>(
    ApiEndpotins.PROMOTION_MAP,
    {
      startLatitude: startLatitude,
      startLongitude: startLongitude,
      endLatitude: endLatitude,
      endLongitude: endLongitude,
      page: page,
      size: size,
    }
  );
};
