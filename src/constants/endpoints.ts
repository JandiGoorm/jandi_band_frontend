export enum PageEndpoints {
  HOME = "/",
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",
  CALLBACK = "/callback",
  PROMOTION = "/promotion",
  PROMOTION_DETAIL = "/promotion/:id",
  PROMOTION_POST = "/promotion/post",
  VOTE = "/vote/:id",
  VOTE = "/vote",
  TEAM = "/team/*",
  TEAM_DETAIL = "/team/:id",
  CLUB = "/club/:id",
  VOTE_RESULT = "/vote/:id/result",
  MYPAGE = "/mypage",
  POST_TIME_SCHEDULE = "/post/time-schedule",
  MY_TIMETABLE_DETAIL = "/time-schedule/:id",
  POST_TEAM_TIMETABLE = "/team/:id/post/timetables",
}

export enum ApiEndpotins {
  SIGN_IN = "/auth/login",
  SIGN_UP = "/auth/signup",
  REFRESH_TOKEN = "/auth/refresh",
  ME = "/users/me/info",
  CLUB = "/clubs",
  CLUB_DETAIL = "/clubs/:id",
  CLUB_MEMBERS = "/clubs/:id/members",
  UNIVERSITIES = "/univ/all",
  CLUB_POLL = "/polls/clubs/:id",

  CLUB_TEAM = "/clubs/:id/teams",

  MY_TIMETABLE = "/users/me/timetables",
  MY_TIMETABLE_DETAIL = "/users/me/timetables/:id",
  TEAM_DETAIL = "/teams/:id",
  MY_TIMETABLE_BY_TEAM = "/teams/:id/members/me/timetable",
}
