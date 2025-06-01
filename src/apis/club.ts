import type { ClubListResponse, MyClubListResponse } from "@/types/club";
import type { Nullable, PagiNationResponse } from "@/types/common";
import { ApiEndpotins } from "@/constants/endpoints";
import { useDelete, useFetch, usePatch, usePost } from "./hooks";
import type { ClubFormData } from "@/layouts/defaultLayout/CreateClubModal";
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
  return useDelete(buildPath(ApiEndpotins.CLUB, { id }));
};

export const useGetClubDetail = (id: string) => {
  return useFetch<ClubDetailResponse>(
    buildPath(ApiEndpotins.CLUB_DETAIL, { id })
  );
};

export const useGetClubs = () => {
  return useFetch(ApiEndpotins.CLUB);
};

export const useGetClubList = () => {
  return useFetch<PagiNationResponse<ClubListResponse>>(ApiEndpotins.CLUB);
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
  return usePost<void, { link: string }>(
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
