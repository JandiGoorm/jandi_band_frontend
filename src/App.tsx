import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalToast from "./components/toast/GlobalToast";
import { queryClient } from "./config/queryClient";
import { routes, publicRoutes } from "@/routes/Routes";
import PrivateRoute from "@/routes/PrivateRoute";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalToast />
      <BrowserRouter>
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
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
