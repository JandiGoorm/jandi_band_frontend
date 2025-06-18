import { PageEndpoints } from "@/constants/endpoints";
import Callback from "@/pages/auth/signIn/Callback";
import SignIn from "@/pages/auth/signIn/SignIn";
import SignUp from "@/pages/auth/signUp/SignUp";
import Club from "@/pages/club/detail/ClubDetail";
import Home from "@/pages/home/Home";
import MyPage from "@/pages/mypage/MyPage";
import PromotionMain from "@/pages/promotions/PromotionMain";
import PromotionDetail from "@/pages/promotions/detail/PromotionDetail";
import PromotionPost from "@/pages/promotions/post/CreatePost";
import TimeSchedule from "@/pages/timeSchedule/post/TimeSchedule";
import VoteResult from "@/pages/vote/result/VoteResult";
import Vote from "@/pages/vote/select/Vote";
import TeamLayout from "@/pages/team/TeamLayout";
import TimeScheduleDetail from "@/pages/timeSchedule/detail/TimeScheduleDetail";
import VoteList from "@/pages/club/more/VoteList";
import FetchPromotion from "@/pages/promotions/update/UpdatePromotion";
import Invite from "@/pages/invite/Invite";
import PromotionMap from "@/pages/promotions/map/PromotionMap";
import MyClubList from "@/pages/club/more/MyClubList";
import ClubList from "@/pages/club/more/ClubList";
import PhotoList from "@/pages/club/more/PhotoList";
import AboutUs from "@/pages/footer/AboutUs";
import AboutService from "@/pages/footer/AboutService";
import PrivacyPolicy from "@/pages/footer/PrivacyPolicy";
import FaqPage from "@/pages/footer/FaqPage";

import Dtest from "@/pages/dragtest/Dtest";

export const publicRoutes = [
  PageEndpoints.SIGN_IN,
  PageEndpoints.CALLBACK,
  PageEndpoints.SIGN_UP,
];

export const routes = [
  { path: PageEndpoints.SIGN_IN, element: <SignIn /> },
  { path: PageEndpoints.SIGN_UP, element: <SignUp /> },
  { path: PageEndpoints.CALLBACK, element: <Callback /> },
  { path: PageEndpoints.HOME, element: <Home /> },
  { path: PageEndpoints.MY_CLUB_LIST, element: <MyClubList /> },
  { path: PageEndpoints.CLUB_LIST, element: <ClubList /> },
  { path: PageEndpoints.PHOTO_LIST, element: <PhotoList /> },
  { path: PageEndpoints.PROMOTION, element: <PromotionMain /> },
  { path: PageEndpoints.PROMOTION_DETAIL, element: <PromotionDetail /> },
  { path: PageEndpoints.PROMOTION_POST, element: <PromotionPost /> },
  { path: PageEndpoints.PROMOTION_UPDATE, element: <FetchPromotion /> },
  { path: PageEndpoints.PROMOTION_MAP, element: <PromotionMap /> },
  { path: PageEndpoints.VOTE, element: <Vote /> },
  { path: PageEndpoints.VOTE_RESULT, element: <VoteResult /> },
  { path: PageEndpoints.CLUB, element: <Club /> },
  { path: PageEndpoints.CLUB_VOTE_LIST, element: <VoteList /> },
  { path: PageEndpoints.MYPAGE, element: <MyPage /> },
  { path: PageEndpoints.POST_TIME_SCHEDULE, element: <TimeSchedule /> },
  { path: PageEndpoints.MY_TIMETABLE_DETAIL, element: <TimeScheduleDetail /> },
  { path: PageEndpoints.TEAM_LAYOUT, element: <TeamLayout /> },
  { path: PageEndpoints.INVITE, element: <Invite /> },
  { path: PageEndpoints.CONTACT, element: <AboutUs /> },
  { path: PageEndpoints.ABOUT, element: <AboutService /> },
  { path: PageEndpoints.PRIVACY, element: <PrivacyPolicy /> },
  { path: PageEndpoints.FAQ, element: <FaqPage /> },

  { path: PageEndpoints.DTEST, element: <Dtest /> },
];
