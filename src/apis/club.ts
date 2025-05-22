import { useFetch } from "@/apis/hooks";
import type { ApiResponse } from "@/apis/types";
import { ApiEndpotins } from "@/constants/endpoints";
import type { ClubListResponse } from "@/types/club";
import type { PageNationResponse } from "@/types/common";

export const useGetClubList = () => {
  return useFetch<ApiResponse<PageNationResponse<ClubListResponse>>>(
    ApiEndpotins.CLUB
  );
};
