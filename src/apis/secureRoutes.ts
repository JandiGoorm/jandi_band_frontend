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
  { method: Method.PATCH, url: ApiEndpotins.ME },
  { method: Method.GET, url: ApiEndpotins.MY_CLUB },
  { method: Method.GET, url: ApiEndpotins.MY_TEAM },
  { method: Method.GET, url: ApiEndpotins.UNIVERSITIES },

  { method: Method.POST, url: ApiEndpotins.CLUB },
  { method: Method.GET, url: ApiEndpotins.CLUB_DETAIL },
  { method: Method.PATCH, url: ApiEndpotins.CLUB_DETAIL },
  { method: Method.POST, url: ApiEndpotins.CLUB_IMAGE },
  { method: Method.GET, url: ApiEndpotins.CLUB_POLL },
  { method: Method.GET, url: ApiEndpotins.CLUB_TEAM },
  { method: Method.POST, url: ApiEndpotins.CLUB_TEAM },
  { method: Method.POST, url: ApiEndpotins.CLUB_INVITE },
  { method: Method.POST, url: ApiEndpotins.JOIN_CLUB },
  { method: Method.GET, url: ApiEndpotins.TEAM_DETAIL },
  { method: Method.POST, url: ApiEndpotins.TEAM_INVITE },
  { method: Method.POST, url: ApiEndpotins.JOIN_TEAM },

  { method: Method.POST, url: ApiEndpotins.MY_TIMETABLE },
  { method: Method.GET, url: ApiEndpotins.MY_TIMETABLE },
  { method: Method.GET, url: ApiEndpotins.MY_TIMETABLE_DETAIL },
  { method: Method.PATCH, url: ApiEndpotins.MY_TIMETABLE_DETAIL },
  { method: Method.DELETE, url: ApiEndpotins.MY_TIMETABLE_DETAIL },
  { method: Method.PATCH, url: ApiEndpotins.MY_TIMETABLE_BY_TEAM },
  { method: Method.POST, url: ApiEndpotins.MY_TIMETABLE_BY_TEAM },

  { method: Method.POST, url: ApiEndpotins.MAKE_POLL },
  { method: Method.GET, url: ApiEndpotins.POLL },
  { method: Method.POST, url: ApiEndpotins.POLL_ADD_RECOMMEND },
  { method: Method.PUT, url: ApiEndpotins.POLL_VOTE },
  { method: Method.DELETE, url: ApiEndpotins.POLL_VOTE },
  { method: Method.GET, url: ApiEndpotins.POLL_LIST },
  { method: Method.POST, url: ApiEndpotins.PROMOTION },
  { method: Method.PATCH, url: ApiEndpotins.PROMOTION_DETAIL },
  { method: Method.DELETE, url: ApiEndpotins.PROMOTION_DETAIL },
  { method: Method.GET, url: ApiEndpotins.PROMOTION_ISLIKE },
  { method: Method.POST, url: ApiEndpotins.PROMOTION_LIKE },
];
