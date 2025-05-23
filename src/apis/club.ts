import { ApiEndpotins } from "@/constants/endpoints";
import { usePost } from "./hooks";

export const usePostClub = () => {
  return usePost(ApiEndpotins.CLUB);
};
