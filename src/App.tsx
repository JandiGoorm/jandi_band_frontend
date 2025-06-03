import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalToast from "./components/toast/GlobalToast";
import { queryClient } from "./config/queryClient";
import { routes } from "./routes/Routes";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalToast />
      <BrowserRouter>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                path={route.path}
                element={
                  <PrivateRoute requireAuth={route.requireAuth}>
                    {route.element}
                  </PrivateRoute>
                }
                key={route.path}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
