import type {
  changeLeaderRequest,
  ClubListResponse,
  MyClubListResponse,
} from "@/types/club";
import type { Nullable, PagiNationResponse } from "@/types/common";
import { ApiEndpotins } from "@/constants/endpoints";
import { useDelete, useFetch, usePatch, usePost } from "./hooks";
import type { ClubFormData } from "@/pages/home/CreateClubModal";
import { buildPath } from "@/utils/buildPath";
import type { ClubDetailResponse, ClubMemberResponse } from "@/types/club";

export const usePostClub = () => {
  return usePost<ClubFormData, ClubDetailResponse>(ApiEndpotins.CLUB);
};

export const useUpdateClub = (id: string) => {
  return usePatch<ClubFormData, ClubDetailResponse>(
    buildPath(ApiEndpotins.CLUB_DETAIL, { id })
  );
};

export const useDeleteClub = (id: string) => {
  return useDelete(buildPath(ApiEndpotins.CLUB_DETAIL, { id }));
};

export const useGetClubDetail = (id: string) => {
  return useFetch<ClubDetailResponse>(
    buildPath(ApiEndpotins.CLUB_DETAIL, { id })
  );
};

export const useGetClubs = () => {
  return useFetch(ApiEndpotins.CLUB);
};

export const useGetClubList = ({
  page = 0,
  size = 20,
}: {
  page?: number;
  size?: number;
}) => {
  return useFetch<PagiNationResponse<ClubListResponse>>(ApiEndpotins.CLUB, {
    page: page,
    size: size,
  });
};

export const useGetMyClubList = () => {
  return useFetch<MyClubListResponse[]>(ApiEndpotins.MY_CLUB);
};

export const useGetClubMembers = (id: string) => {
  return useFetch<ClubMemberResponse>(
    buildPath(ApiEndpotins.CLUB_MEMBERS, { id })
  );
};

export const useInviteClub = (id: string) => {
  return usePost<void, { code: string }>(
    buildPath(ApiEndpotins.CLUB_INVITE, { id })
  );
};

export const useJoinClub = (code: string) => {
  return usePost<void, { clubId: Nullable<string>; teamId: Nullable<string> }>(
    `${ApiEndpotins.JOIN_CLUB}?code=${code}`
  );
};

export const useUpdateClubImage = (id: string) => {
  return usePost<FormData, string>(buildPath(ApiEndpotins.CLUB_IMAGE, { id }));
};

export const useLeaveClub = (id: string) => {
  return useDelete(buildPath(ApiEndpotins.LEAVE_CLUB, { id }));
};

export const useOutMember = (clubId: string, userId: number) => {
  return useDelete(buildPath(ApiEndpotins.MEMBER_OUT, { clubId, userId }));
};

export const useLeaderChange = (id: string) => {
  return usePatch<changeLeaderRequest, null>(
    buildPath(ApiEndpotins.LEADER_CHANGE, { id })
  );
};
