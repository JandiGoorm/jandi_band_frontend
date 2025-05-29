import { ApiEndpotins } from "@/constants/endpoints";
import { useFetch } from "./hooks";
import { buildPath } from "@/utils/buildPath";
import type { Poll } from "@/types/poll";
import type { PageableResponse } from "@/types/common";

export const useGetClubPoll = (id: string) => {
  return useFetch<PageableResponse<Poll>>(
    buildPath(ApiEndpotins.CLUB_POLL, { id })
  );
};
