import axios from "axios";
import { secureRoutes } from "./secureRoutes";

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
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const url = new URL(config.url as string);
  console.log(url.pathname);
  const pathname = url.pathname.replace("/api", "");
  const isProtected = secureRoutes.some(
    (endpoint) => endpoint.method === config.method && endpoint.url === pathname
  );

  if (isProtected) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken") || ""}`;
  }
  return config;
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
