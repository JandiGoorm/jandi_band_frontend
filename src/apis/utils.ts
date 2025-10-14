import axios from "axios";
import { notFoundRoutes, secureRoutes } from "./secureRoutes";
import { ApiEndpotins, PageEndpoints } from "@/constants/endpoints";
import type { RefreshTokenResponse } from "@/types/auth";
import type { ApiResponse } from "./types";
import type { AxiosResponse } from "axios";
import { useToastStore } from "@/stores/toastStore";

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
  timeout: 10000,
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

//404에러시 페이지 이동 처리
function isNotFoundRoute(url: string): boolean {
  // URL에서 base 도메인 제거
  const pathname = new URL(url, domain).pathname.replace("/api", "");

  return notFoundRoutes.some((endpoint) => {
    // :id → 정규식 변환
    const regex = new RegExp("^" + endpoint.replace(/:[^/]+/g, "[^/]+") + "$");
    return regex.test(pathname);
  });
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      const requestUrl = error.config?.url || "";

      if (isNotFoundRoute(requestUrl)) {
        // club/team 관련 404만 NotFoundPage로 이동
        window.location.href = "/404";
        return;
      }
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const toast = useToastStore.getState();

    // console.log(error);

    if (error.code === "ECONNABORTED") {
      console.error("⏰ 요청이 시간 초과되었습니다.");
      toast.showToast("error", "요청이 시간 초과되었습니다.", "timeout");
      toast.setErrorOccurred(true);
      return Promise.reject(error);
    }

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
        window.location.href = PageEndpoints.HOME;
        return Promise.reject(error);
      }
    }
    if (error.code === "ERR_NETWORK") {
      console.error("서버 에러가 발생하였습니다.");
      toast.showToast("error", "서버와 연결할 수 없습니다.", "network");
      toast.setErrorOccurred(true);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
