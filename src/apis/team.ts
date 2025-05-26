import { ApiEndpotins } from "@/constants/endpoints";
import { usePost } from "./hooks";
// import { buildPath } from "@/utils/buildPath";
import type { TeamFormData } from "@/pages/club/detail/clubSlide/modalContent/TeamModal";
import type { TeamResponse } from "@/types/team";
import { buildPath } from "@/utils/buildPath";

export const usePostTeam = (id: string) => {
  return usePost<TeamFormData, TeamResponse>(
    buildPath(ApiEndpotins.CLUB_TEAM, { id })
  );
};
