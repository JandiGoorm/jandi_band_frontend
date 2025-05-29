import { useFetch } from "@/apis/hooks";
import { ApiEndpotins } from "@/constants/endpoints";
import type { PagiNationResponse } from "@/types/common";
import type { PromotionListResponse } from "@/types/promotion";

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
