import { ApiEndpotins } from "@/constants/endpoints";

enum Method {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export const secureRoutes = [
  { method: Method.POST, url: ApiEndpotins.SIGN_UP },
  { method: Method.GET, url: ApiEndpotins.ME },
  { method: Method.GET, url: ApiEndpotins.MY_CLUB },
  { method: Method.POST, url: ApiEndpotins.CLUB },
  { method: Method.GET, url: ApiEndpotins.CLUB_DETAIL },
  { method: Method.GET, url: ApiEndpotins.UNIVERSITIES },
  { method: Method.GET, url: ApiEndpotins.CLUB_POLL },
  { method: Method.POST, url: ApiEndpotins.MY_TIMETABLE },
  { method: Method.GET, url: ApiEndpotins.MY_TIMETABLE },
  { method: Method.GET, url: ApiEndpotins.MY_TIMETABLE_DETAIL },
  { method: Method.PATCH, url: ApiEndpotins.MY_TIMETABLE_DETAIL },
  { method: Method.DELETE, url: ApiEndpotins.MY_TIMETABLE_DETAIL },
];
