import { useFetch } from "./hooks";
import { buildPath } from "@/utils/buildPath";
import type { PagiNationResponse } from "@/types/common";
import { ApiEndpotins } from "@/constants/endpoints";
import type { PhotoResponse } from "@/types/photo";

export const useGetPhotos = ({
  id,
  page = 0,
  size = 20,
}: {
  id: string;
  page?: number;
  size?: number;
}) => {
  return useFetch<PagiNationResponse<PhotoResponse>>(
    buildPath(ApiEndpotins.CLUB_PHOTO, { id }),
    { page: page, size: size }
  );
};
