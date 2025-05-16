import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import Vote from "@/pages/vote/Vote";
import { PageEndpoints } from "@/constants/endpoints";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PageEndpoints.HOME} element={<Home />} />
        <Route path={PageEndpoints.VOTE} element={<Vote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
