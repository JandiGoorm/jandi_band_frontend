import { type TeamDetailResponse } from "@/types/team";
import { useFetch } from "@/apis/hooks";
import { ApiEndpotins } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";

export const useGetTeamDetail = (id: string) => {
  return useFetch<TeamDetailResponse>(
    buildPath(ApiEndpotins.TEAM_DETAIL, { id })
  );
};
