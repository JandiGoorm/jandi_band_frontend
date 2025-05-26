import { ApiEndpotins } from "@/constants/endpoints";
import { useFetch, usePost } from "./hooks";
// import { buildPath } from "@/utils/buildPath";
import type { TeamFormData } from "@/pages/club/detail/clubSlide/modalContent/TeamModal";
import type { TeamBasicResponse, TeamResponse } from "@/types/team";
import { buildPath } from "@/utils/buildPath";
import type { PageableResponse } from "@/types/common";

export const usePostTeam = (id: string) => {
  return usePost<TeamFormData, TeamResponse>(
    buildPath(ApiEndpotins.CLUB_TEAM, { id })
  );
};

export const useGetTeamList = (id: string) => {
  return useFetch<PageableResponse<TeamBasicResponse>>(
    buildPath(ApiEndpotins.CLUB_TEAM, { id })
  );
};
