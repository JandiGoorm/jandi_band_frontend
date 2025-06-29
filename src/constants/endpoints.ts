export enum PageEndpoints {
  HOME = "/",
  SIGN_UP = "/sign-up",
  CALLBACK = "/callback",
  PROMOTION = "/promotion",
  PROMOTION_MAP = "/promotion/map",
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
  MY_CLUB_LIST = "/clubs/my",
  CLUB_LIST = "/clubs",
  PHOTO_LIST = "/photos/:id",

  //  푸터에 들어갈 링크들
  CONTACT = "/contact",
  ABOUT = "/about",
  PRIVACY = "/privacy",
  FAQ = "/faq",
}

export enum ApiEndpotins {
  SIGN_IN = "/auth/login",
  SIGN_UP = "/auth/signup",
  REFRESH_TOKEN = "/auth/refresh",
  ME = "/users/me/info",

  PROMOTION = "/promos",
  PROMOTION_DETAIL = "/promos/:id",
  PROMOTION_LIKE = "/promos/:id/like",
  PROMOTION_ISLIKE = "/promos/:id/like/status",
  PROMOTION_MAP = "/promos/map",
  PROMOTION_SEARCH = "/promos/search",
  PROMOTION_SEARCH_STATUS = "/promos/status",
  CLUB = "/clubs",
  MY_CLUB = "/my/clubs",
  CLUB_DETAIL = "/clubs/:id",
  CLUB_MEMBERS = "/clubs/:id/members",
  CLUB_TEAM = "/clubs/:id/teams",
  CLUB_IMAGE = "/clubs/:id/main-image",

  MY_TEAM = "/my/teams",
  UNIVERSITIES = "/univ/all",
  CLUB_INVITE = "/invite/clubs/:id",
  JOIN_CLUB = "/join/clubs",
  LEAVE_CLUB = "/clubs/:id/members/me",
  MY_TIMETABLE = "/users/me/timetables",
  MY_TIMETABLE_DETAIL = "/users/me/timetables/:id",
  MY_TIMETABLE_BY_TEAM = "/teams/:id/members/me/timetable",
  MEMBER_OUT = "/clubs/:clubId/members/:userId", //동아리 부원 강퇴
  LEADER_CHANGE = "/clubs/:id/representative", //동아리 대표자 위임

  TEAM_DETAIL = "/teams/:id",
  TEAM_INVITE = "/invite/teams/:id",
  JOIN_TEAM = "/join/teams",
  LEAVE_TEAM = "/teams/:id/members/me",

  CLUB_POLL = "/polls/clubs/:id",
  MAKE_POLL = "/polls", //투표 생성
  POLL = "/polls/:pollId", // 투표 상세 조회
  POLL_ADD_RECOMMEND = "/polls/:pollId/songs",
  POLL_VOTE = "/polls/:pollId/songs/:songId/votes/:emoji",
  POLL_LIST = "/polls/clubs/:clubId",

  // 캘린더용 통합 일정 조회
  CALENDAR = "/clubs/:clubId/calendar", // 뒤에 쿼리 파라미터 들어감
  POST_CALENDAR_EVENT = "/clubs/:clubId/events", // 동아리 일정 추가
  DELETE_CALENDAR_EVENT = "/clubs/:clubId/events/:eventId", // 동아리 일정 삭제
  // 팀 연습 일정 등록 및 조회
  TEAM_SCHEDULES = "/teams/:teamId/practice-schedules",
  DELETE_TEAM_SCHEDULES = "/teams/:teamId/practice-schedules/:scheduleId", // 팀 연습 일정 삭제

  CLUB_PHOTO = "/clubs/:id/photo",
  CLUB_PHOTO_DETAIL = "/clubs/:clubId/photo/:photoId",

  COMMENT = "/promos/:id/comments",
  COMMENT_DETAIL = "/promos/comments/:id",

  REPORT_PROMO = "/promos/reports",
  REPORT_COMMENT = "/promos/comments/reports",

  USER_BREAK = "/auth/cancel", //회원탈퇴
}
