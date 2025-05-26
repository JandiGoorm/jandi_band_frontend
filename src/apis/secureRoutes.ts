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
  { method: Method.POST, url: ApiEndpotins.CLUB },
  { method: Method.GET, url: ApiEndpotins.CLUB_DETAIL },
  { method: Method.PATCH, url: ApiEndpotins.CLUB_DETAIL },
  { method: Method.GET, url: ApiEndpotins.UNIVERSITIES },
  { method: Method.GET, url: ApiEndpotins.CLUB_POLL },
  { method: Method.GET, url: ApiEndpotins.CLUB_TEAM },
  { method: Method.POST, url: ApiEndpotins.CLUB_TEAM },
];
