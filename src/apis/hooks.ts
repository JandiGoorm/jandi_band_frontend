import {
  useQuery,
  useMutation,
  type QueryFunctionContext,
  type QueryKey,
  type MutationOptions,
} from "@tanstack/react-query";
import { api } from "./utils";
import type { ApiResponse, QueryOptions } from "./types";
import { buildPath } from "@/utils/buildPath";

const fetcher = async <T>(context: QueryFunctionContext<QueryKey>) => {
  const { queryKey } = context;
  const [url, params] = queryKey;
  const res = await api.get<ApiResponse<T>>(url as string, params as object);
  return res.data;
};

/**
 * T = 서버에서 받아올 데이터의 타입
 * @param url 요청할 url
 * @param params 요청할 url에 붙힐 query params
 * @param options  query options (ex. onSuccess, onError, onSettled 등)
 */
export const useFetch = <T>(
  url: string,
  params?: object,
  options?: QueryOptions<T>
) => {
  return useQuery<T, Error, T, QueryKey>({
    queryKey: [url, params],
    queryFn: fetcher,
    ...options,
  });
};

/**
 * T = 요청할 데이터의 타입
 * S = 서버에서 받아올 데이터의 타입
 * @param url 요청할 url
 * @param options  mutation options (ex. onSuccess, onError, onSettled 등)
 */
export const usePost = <T = object, S = unknown>(
  url: string,
  options?: MutationOptions<ApiResponse<S>, unknown, T>
) => {
  return useMutation<ApiResponse<S>, unknown, T>({
    mutationFn: (data) => api.post<ApiResponse<S>>(url, data ?? {}),
    ...options,
  });
};

/**
 * T = 요청 보낼때 body의 타입
 * S = 서버에서 받아올 데이터의 타입
 * @param url 요청할 url
 * @param options  mutation options (ex. onSuccess, onError, onSettled 등)
 */
export const useUpdate = <T = object, S = unknown>(
  url: string,
  options?: MutationOptions<ApiResponse<S>, unknown, T>
) => {
  return useMutation<ApiResponse<S>, unknown, T>({
    mutationFn: (data) => api.put<ApiResponse<S>>(url, data ?? {}),
    ...options,
  });
};

/**
 * T = 요청 보낼때 body의 타입
 * S = 서버에서 받아올 데이터의 타입
 * @param url 요청할 url
 * @param options  mutation options (ex. onSuccess, onError, onSettled 등)
 */
export const usePatch = <T = object, S = unknown>(
  url: string,
  options?: MutationOptions<ApiResponse<S>, unknown, T>
) => {
  return useMutation<ApiResponse<S>, unknown, T>({
    mutationFn: (data) => api.patch<ApiResponse<S>>(url, data ?? {}),
    ...options,
  });
};

/**
 * T = 요청 보낼때 데이터 타입 (대부분의 경우 id)
 * S = 서버에서 받아올 데이터의 타입
 * @param url 요청할 url
 * @param options  mutation options (ex. onSuccess, onError, onSettled 등)
 */
export const useDelete = <T extends string | number = number, S = unknown>(
  url: string,
  options?: MutationOptions<ApiResponse<S>, unknown, T>
) => {
  return useMutation<ApiResponse<S>, unknown, T>({
    mutationFn: (data) =>
      api.delete<ApiResponse<S>>(buildPath(url, { id: data })),
    ...options,
  });
};
