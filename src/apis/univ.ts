import { ApiEndpotins } from "@/constants/endpoints";
import type { University } from "@/types/univ";
import { useFetch } from "./hooks";

export const useGetUniversities = () => {
  return useFetch<University[]>(ApiEndpotins.UNIVERSITIES);
};
