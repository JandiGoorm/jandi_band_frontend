import { PageEndpoints } from "@/constants/endpoints";
import Callback from "@/pages/auth/signIn/Callback";
import SignUp from "@/pages/auth/signUp/SignUp";
import Club from "@/pages/club/detail/ClubDetail";
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
import HomeRouter from "./HomeRouter";

export const publicRoutes = [
  PageEndpoints.HOME,
  PageEndpoints.CALLBACK,
  PageEndpoints.SIGN_UP,
];

export const routes = [
  { path: PageEndpoints.HOME, element: <HomeRouter /> },
  { path: PageEndpoints.SIGN_UP, element: <SignUp /> },
  { path: PageEndpoints.CALLBACK, element: <Callback /> },
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
];
