import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import { PageEndpoints } from "@/constants/endpoints";
import PromotionMain from "@/pages/promotions/PromotionMain";
import PromotionDetail from "@/pages/promotions/detail/PromotionDetail";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
