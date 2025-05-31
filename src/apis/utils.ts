import axios from "axios";
import { secureRoutes } from "./secureRoutes";
import { ApiEndpotins } from "@/constants/endpoints";
import type { RefreshTokenResponse } from "@/types/auth";
import type { ApiResponse } from "./types";
import type { AxiosResponse } from "axios";

const domain = import.meta.env.VITE_API_DOMAIN;

export const getDomain = (url?: string) => {
  return `${domain}${url ? `${url}` : ""}`;
};

type Api = {
  get: <T>(url: string, params?: object) => Promise<T>;
  post: <T>(url: string, data?: object) => Promise<T>;
  put: <T>(url: string, data?: object) => Promise<T>;
  patch: <T>(url: string, data?: object) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
};

const axiosInstance = axios.create({
  baseURL: domain,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export const api: Api = {
  get: (url, params) => {
    const queryString = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (Array.isArray(value))
        value.forEach((v) => queryString.append(key, v));
      else queryString.append(key, value);
    });

    return axiosInstance.get(getDomain(url), {
      params: Object.fromEntries(queryString),
    });
  },

  post: (url, data) => {
    return axiosInstance.post(getDomain(url), data);
  },

  put: (url, data) => {
    return axiosInstance.put(getDomain(url), data);
  },

  patch: (url, data) => {
    return axiosInstance.patch(getDomain(url), data);
  },

  delete: (url) => {
    return axiosInstance.delete(getDomain(url));
  },
};

axiosInstance.interceptors.request.use((config) => {
  const url = new URL(config.url as string);
  const pathname = url.pathname.replace("/api", "");

  // 동적 경로 파라미터를 포함한 URL 패턴 매칭
  const isProtected = secureRoutes.some((endpoint) => {
    if (endpoint.method !== config.method) return false;

    // :param 형태의 동적 파라미터를 정규식으로 변환
    const pattern = endpoint.url.replace(/:[^/]+/g, "[^/]+");
    const regex = new RegExp(`^${pattern}$`);

    return regex.test(pathname);
  });

  if (isProtected) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken") || ""}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const errorMessage = error.response.data.message;
    if (
      errorMessage === "유효하지 않은 토큰입니다." &&
      error.config.url !== ApiEndpotins.REFRESH_TOKEN
    ) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return Promise.reject(error);
      try {
        const response = await api.post<
          AxiosResponse<ApiResponse<RefreshTokenResponse>>
        >(ApiEndpotins.REFRESH_TOKEN, {
          refreshToken,
        });
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data.data;
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance.request(error.config);
      } catch (err) {
        console.log("err", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }
    }
  }
);
