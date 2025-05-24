import { ApiEndpotins } from "@/constants/endpoints";
import { useFetch } from "./hooks";
import { buildPath } from "@/utils/buildPath";
import type { Poll } from "@/types/poll";

export const useGetClubPoll = (id: string) => {
  return useFetch<Poll[]>(buildPath(ApiEndpotins.CLUB_POLL, { id }));
};
