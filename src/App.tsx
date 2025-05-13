import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import { PageEndpoints } from "@/constants/endpoints";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PageEndpoints.HOME} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
