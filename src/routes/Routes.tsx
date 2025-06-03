import { PageEndpoints } from "@/constants/endpoints";
import Callback from "@/pages/auth/signIn/Callback";
import Home from "@/pages/home/Home";
import PromotionDetail from "@/pages/promotions/detail/PromotionDetail";
import PromotionMain from "@/pages/promotions/PromotionMain";
import PromotionPost from "@/pages/promotions/post/CreatePost";
import FetchPromotion from "@/pages/promotions/update/UpdatePromotion";
import SignIn from "@/pages/auth/signIn/SignIn";
import Vote from "@/pages/vote/select/Vote";
import TeamLayout from "@/pages/team/TeamLayout";
import Club from "@/pages/club/detail/ClubDetail";
import VoteList from "@/pages/club/more/VoteList";
import VoteResult from "@/pages/vote/result/VoteResult";
import MyPage from "@/pages/mypage/MyPage";
import TimeSchedule from "@/pages/timeSchedule/post/TimeSchedule";
import TimeScheduleDetail from "@/pages/timeSchedule/detail/TimeScheduleDetail";
import Invite from "@/pages/invite/Invite";

export const routes = [
  {
    path: PageEndpoints.HOME,
    element: <Home />,
    requireAuth: false,
  },
  {
    path: PageEndpoints.CALLBACK,
    element: <Callback />,
    requireAuth: false,
  },
  {
    path: PageEndpoints.PROMOTION,
    element: <PromotionMain />,
    requireAuth: false,
  },
  {
    path: PageEndpoints.PROMOTION_DETAIL,
    element: <PromotionDetail />,
    requireAuth: false,
  },
  {
    path: PageEndpoints.PROMOTION_POST,
    element: <PromotionPost />,
    requireAuth: true,
  },
  {
    path: PageEndpoints.PROMOTION_UPDATE,
    element: <FetchPromotion />,
    requireAuth: true,
  },
  {
    path: PageEndpoints.SIGN_IN,
    element: <SignIn />,
    requireAuth: false,
  },
  {
    path: PageEndpoints.SIGN_UP,
    element: <SignIn />,
    requireAuth: true,
  },
  {
    path: PageEndpoints.VOTE,
    element: <Vote />,
    requireAuth: false,
  },
  {
    path: PageEndpoints.TEAM_LAYOUT,
    element: <TeamLayout />,
    requireAuth: false,
  },
  {
    path: PageEndpoints.CLUB,
    element: <Club />,
    requireAuth: false,
  },
  {
    path: PageEndpoints.CLUB_VOTE_LIST,
    element: <VoteList />,
    requireAuth: false,
  },
  {
    path: PageEndpoints.VOTE_RESULT,
    element: <VoteResult />,
    requireAuth: false,
  },
  {
    path: PageEndpoints.MYPAGE,
    element: <MyPage />,
    requireAuth: true,
  },
  {
    path: PageEndpoints.POST_TIME_SCHEDULE,
    element: <TimeSchedule />,
    requireAuth: true,
  },
  {
    path: PageEndpoints.MY_TIMETABLE_DETAIL,
    element: <TimeScheduleDetail />,
    requireAuth: true,
  },
  {
    path: PageEndpoints.INVITE,
    element: <Invite />,
    requireAuth: true,
  },
];
