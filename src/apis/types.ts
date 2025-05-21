import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";

export type Nullable<T> = T | null;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorCode: Nullable<string>;
}

export class ApiError extends Error {
  private _status: number;

  constructor(status: number, message: string) {
    super(message);
    this._status = status;
  }

  get status() {
    return this._status;
  }
}

export type QueryOptions<T> = Omit<
  UseQueryOptions<T, ApiError, T, QueryKey>,
  "queryKey"
>;
