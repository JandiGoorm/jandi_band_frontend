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
import MyPage from "@/pages/mypage/MyPage";
import Callback from "@/pages/auth/signIn/Callback";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import GlobalToast from "./components/toast/GlobalToast";
import { useToastStore } from "./stores/toastStore";
import { getRandomId } from "./utils/random";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },

  mutationCache: new MutationCache({
    onMutate: () => {
      // 각 mutation에 고유 ID 할당
      const toastId = getRandomId();
      // 로딩 토스트 표시
      useToastStore.getState().showToast("pending", "처리 중...", toastId);
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      const ctx = context as { toastId: string } | undefined;
      if (!ctx || !ctx.toastId) return;

      useToastStore
        .getState()
        .updateToast(ctx.toastId, "success", "성공적으로 처리되었습니다.");
    },
    onError: (error, _variables, context) => {
      const ctx = context as { toastId: string } | undefined;
      if (!ctx || !ctx.toastId) return;

      useToastStore
        .getState()
        .updateToast(
          ctx.toastId,
          "error",
          error instanceof Error ? error.message : "오류가 발생했습니다."
        );
    },
  }),
});

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
          <Route path={PageEndpoints.MYPAGE} element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
