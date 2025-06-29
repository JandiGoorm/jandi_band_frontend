import { type TeamDetailResponse } from "@/types/team";
import { useDelete, useFetch, usePost } from "@/apis/hooks";
import { ApiEndpotins } from "@/constants/endpoints";
import type { TeamFormData } from "@/pages/club/detail/clubSlide/modalContent/TeamModal";
import type { MyTeamInfo, TeamBasicResponse, TeamResponse } from "@/types/team";
import { buildPath } from "@/utils/buildPath";
import type { PagiNationResponse, Nullable } from "@/types/common";

export const useGetTeamDetail = (id: string) => {
  return useFetch<TeamDetailResponse>(
    buildPath(ApiEndpotins.TEAM_DETAIL, { id })
  );
};

export const usePostTeam = (id: string) => {
  return usePost<TeamFormData, TeamResponse>(
    buildPath(ApiEndpotins.CLUB_TEAM, { id })
  );
};

export const useGetTeamList = (id: string) => {
  return useFetch<PagiNationResponse<TeamBasicResponse>>(
    buildPath(ApiEndpotins.CLUB_TEAM, { id })
  );
};

export const useGetMyTeamList = () => {
  return useFetch<MyTeamInfo[]>(ApiEndpotins.MY_TEAM);
};

export const useInviteTeam = (id: string) => {
  return usePost<void, { code: string }>(
    buildPath(ApiEndpotins.TEAM_INVITE, { id })
  );
};

export const useInviteClub = (id: string) => {
  return usePost<void, { link: string }>(
    buildPath(ApiEndpotins.CLUB_INVITE, { id })
  );
};

export const useJoinTeam = (code: string) => {
  return usePost<void, { teamId: Nullable<string>; clubId: Nullable<string> }>(
    `${ApiEndpotins.JOIN_TEAM}?code=${code}`
  );
};

export const useLeaveTeam = (id: string) => {
  return useDelete(buildPath(ApiEndpotins.LEAVE_TEAM, { id }));
};

export const useDeleteTeam = (id: string) => {
  return useDelete(buildPath(ApiEndpotins.TEAM_DETAIL, { id }));
};
