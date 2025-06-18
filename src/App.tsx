import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalToast from "./components/toast/GlobalToast";
import { queryClient } from "./config/queryClient";
import { routes, publicRoutes } from "@/routes/Routes";
import PrivateRoute from "@/routes/PrivateRoute";

import { useEffect } from "react";
import ScrollToTop from "./routes/ScrollToTop";
import ErrorRedirectHandler from "./utils/ErrorRedirectHandler";

function App() {
  // 카카오 메세지 공유를 위한 추가
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalToast />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {routes.map(({ path, element }) => {
            const isPublic = publicRoutes.includes(path);
            return (
              <Route
                key={path}
                path={path}
                element={
                  isPublic ? element : <PrivateRoute>{element}</PrivateRoute>
                }
              />
            );
          })}
        </Routes>
        <ErrorRedirectHandler />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
