import axios from "axios";
import { notFoundRoutes, secureRoutes } from "./secureRoutes";
import { ApiEndpotins } from "@/constants/endpoints";
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

// 10.15 (로그인 수정) - 기본 인스턴스 수정
const axiosInstance = axios.create({
  baseURL: domain,
  timeout: 8000, // 응답 8초 넘으면 오류
  withCredentials: true, // RefreshToken 쿠키 자동 전송
  headers: {
    // "Content-Type": "application/json",
  },
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

// 10.15 (로그인 수정) 요청 인터셉터
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

  // 보호된 경로면 자동 첨부
  if (isProtected) {
    const accessToken = localStorage.getItem("accessToken");

    // 🐹 서버 응답 확인용
    // console.log("[REQUEST URL]", config.url);
    // console.log("[REQUEST METHOD]", config.method);
    // console.log("[REQUEST AUTHORIZATION]", accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
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

// 🚨 10.15 (로그인 수정) 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    // 🐹 로그인 직후 서버가 accessToken / refreshToken을 주는지 확인
    // console.log("[헤더 응답]", response.headers);

    // 10.15 서버가 AccessToken을 헤더로 내려줄 때만 저장
    const newAccessToken = response.headers["accesstoken"];
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }

    return response;
  },
  async (error) => {
    const toast = useToastStore.getState();
    const status = error.response?.status;

    // 10.16 민근님 코드 안에 넣어뒀습니다
    if (status === 404) {
      const requestUrl = error.config?.url || "";
      if (isNotFoundRoute(requestUrl)) {
        window.location.href = "/404";
        return Promise.reject(error);
      }
    }

    if (error.code === "ECONNABORTED") {
      console.error("⏰ 요청이 시간 초과되었습니다.");
      toast.showToast("error", "요청이 시간 초과되었습니다.", "timeout");
      toast.setErrorOccurred(true);
      return Promise.reject(error);
    }

    // 토큰 만료 감지 및 자동 재발급
    const errorMessage = error.response.data.message;

    // AccessToken 만료시 refresh 요청
    if (
      errorMessage === "유효하지 않은 토큰입니다." &&
      error.config.url !== ApiEndpotins.REFRESH_TOKEN &&
      !error.config.url.includes("/auth/login") // ✅ 로그인 요청은 refresh 시도 금지
    ) {
      try {
        const refreshRes = await axiosInstance.post(
          ApiEndpotins.REFRESH_TOKEN,
          { refreshToken: null }, // 형식상 포함
          { withCredentials: true }
        );

        // 🚨 갱신 방법 수정완료. RefreshToken은 헤더가 아니라 쿠키로 내려오므로
        const newAccessToken = refreshRes.headers["accesstoken"];

        if (newAccessToken) {
          // 새 액세스토큰으로 대체
          localStorage.setItem("accessToken", newAccessToken);

          // 이후 실패한 요청 다시 전송
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance.request(error.config);
        }

        // 원래 요청에 붙여서 재시도
        return axiosInstance.request(error.config);
      } catch (err) {
        console.log("err", err);
        localStorage.removeItem("accessToken");
        toast.showToast(
          "error",
          "세션이 만료되었습니다. 다시 로그인해주세요.",
          "auth"
        );
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
