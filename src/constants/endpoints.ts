export enum PageEndpoints {
  HOME = "/",
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",
  CALLBACK = "/callback",
  PROMOTION = "/promotion",
  PROMOTION_DETAIL = "/promotion/:id",
  PROMOTION_POST = "/promotion/post",
  PROMOTION_UPDATE = "/promotion/edit/:id",
  VOTE = "/vote/:id",
  TEAM_LAYOUT = "/team/:id/*",
  TEAM_DETAIL = "/team/:id",
  CLUB = "/club/:id",
  CLUB_VOTE_LIST = "/club/:id/vote",
  VOTE_RESULT = "/vote/:id/result",
  MYPAGE = "/mypage",
  POST_TIME_SCHEDULE = "/post/time-schedule",
  MY_TIMETABLE_DETAIL = "/time-schedule/:id",
  POST_TEAM_TIMETABLE = "/team/:id/post/timetables",
  INVITE = "/invite/:type/accept",
}

export enum ApiEndpotins {
  SIGN_IN = "/auth/login",
  SIGN_UP = "/auth/signup",
  REFRESH_TOKEN = "/auth/refresh",
  ME = "/users/me/info",

  PROMOTION = "/promos",
  PROMOTION_DETAIL = "/promos/:id",
  CLUB = "/clubs",
  MY_CLUB = "/my/clubs",
  CLUB_DETAIL = "/clubs/:id",
  CLUB_MEMBERS = "/clubs/:id/members",
  CLUB_TEAM = "/clubs/:id/teams",

  MY_TEAM = "/my/teams",
  UNIVERSITIES = "/univ/all",
  CLUB_INVITE = "/invite/clubs/:id",
  JOIN_CLUB = "/join/clubs",
  MY_TIMETABLE = "/users/me/timetables",
  MY_TIMETABLE_DETAIL = "/users/me/timetables/:id",
  MY_TIMETABLE_BY_TEAM = "/teams/:id/members/me/timetable",

  TEAM_DETAIL = "/teams/:id",
  TEAM_INVITE = "/invite/teams/:id",
  JOIN_TEAM = "/join/teams",

  CLUB_POLL = "/polls/clubs/:id",
  MAKE_POLL = "/polls", //투표 생성
  POLL = "/polls/:pollId", // 투표 상세 조회
  POLL_ADD_RECOMMEND = "/polls/:pollId/songs",
  POLL_VOTE = "/polls/:pollId/songs/:songId/votes/:emoji",
  POLL_LIST = "/polls/clubs/:clubId",
}
