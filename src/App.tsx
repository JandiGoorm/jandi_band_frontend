import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import PromotionMain from "@/pages/promotions/PromotionMain";
import PromotionDetail from "@/pages/promotions/detail/PromotionDetail";
import PromotionPost from "@/pages/promotions/post/CreatePost";
import Home from "@/pages/home/Home";
import Vote from "@/pages/vote/select/Vote";
import VoteResult from "@/pages/vote/result/VoteResult";
import SignIn from "@/pages/auth/signIn/SignIn";
import SignUp from "@/pages/auth/signUp/SignUp";
import Team from "@/pages/team/Team";
import Club from "./pages/club/main/Club";
import Callback from "@/pages/auth/signIn/Callback";
import { QueryClientProvider } from "@tanstack/react-query";
import GlobalToast from "./components/toast/GlobalToast";
import { queryClient } from "./config/queryClient";

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
          <Route path={PageEndpoints.TEAM} element={<Team />} />
          <Route path={PageEndpoints.CLUB} element={<Club />} />
          <Route path={PageEndpoints.VOTE_RESULT} element={<VoteResult />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
