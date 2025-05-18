import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import PromotionMain from "@/pages/promotions/PromotionMain";
import PromotionDetail from "@/pages/promotions/detail/PromotionDetail";
import Home from "@/pages/home/Home";
import Vote from "@/pages/vote/Vote";
import SignIn from "@/pages/auth/signIn/SignIn";
import SignUp from "@/pages/auth/signUp/SignUp";
import Team from "@/pages/team/Team";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PageEndpoints.HOME} element={<Home />} />
        <Route path={PageEndpoints.PROMOTION} element={<PromotionMain />} />
        <Route
          path={PageEndpoints.PROMOTION_DETAIL}
          element={<PromotionDetail />}
        />
        <Route path={PageEndpoints.SIGN_IN} element={<SignIn />} />
        <Route path={PageEndpoints.SIGN_UP} element={<SignUp />} />
        <Route path={PageEndpoints.VOTE} element={<Vote />} />
        <Route path={PageEndpoints.TEAM} element={<Team />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
