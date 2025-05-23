import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import type { Nullable } from "@/types/common";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorCode: Nullable<string>;
}

export type QueryOptions<T> = Omit<
  UseQueryOptions<T, Error, T, QueryKey>,
  "queryKey"
>;

export enum ApiStatus {
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}
