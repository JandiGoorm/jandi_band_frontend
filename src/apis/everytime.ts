// 에브리타임 연결 api
import axios from "axios";

export interface TimeTableResponse {
  success: boolean;
  message: string;
  data: {
    timetableData: {
      [day: string]: string[];
    };
  };
}

const scraperAxios = axios.create({
  baseURL: "https://rhythmeet-be.yeonjae.kr",
});

scraperAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchTimeTableFromEverytime = async (url: string) => {
  const response = await scraperAxios.get<TimeTableResponse>(
    "/scraper/timetable",
    {
      params: { url },
    }
  );

  return response.data;
};
