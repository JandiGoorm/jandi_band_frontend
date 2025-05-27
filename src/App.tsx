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
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalToast from "./components/toast/GlobalToast";
import { queryClient } from "./config/queryClient";
import TeamLayout from "./pages/team/TeamLayout";
import TimeScheduleDetail from "./pages/timeSchedule/detail/TimeScheduleDetail";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalToast />
      <BrowserRouter>
        <Routes>
          <Route path={PageEndpoints.HOME} element={<Home />} />
          <Route path={PageEndpoints.CALLBACK} element={<Callback />} />
          <Route path={PageEndpoints.PROMOTION} element={<PromotionMain />} />
          <Route
            path={PageEndpoints.PROMOTION_DETAIL}
            element={<PromotionDetail />}
          />
          <Route
            path={PageEndpoints.PROMOTION_POST}
            element={<PromotionPost />}
          />
          <Route path={PageEndpoints.SIGN_IN} element={<SignIn />} />
          <Route path={PageEndpoints.SIGN_UP} element={<SignUp />} />
          <Route path={PageEndpoints.VOTE} element={<Vote />} />
          <Route path={PageEndpoints.TEAM} element={<TeamLayout />} />
          <Route path={PageEndpoints.CLUB} element={<Club />} />
          <Route path={PageEndpoints.VOTE_RESULT} element={<VoteResult />} />
          <Route path={PageEndpoints.MYPAGE} element={<MyPage />} />
          <Route
            path={PageEndpoints.POST_TIME_SCHEDULE}
            element={<TimeSchedule />}
          />
          <Route
            path={PageEndpoints.MY_TIMETABLE_DETAIL}
            element={<TimeScheduleDetail />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
