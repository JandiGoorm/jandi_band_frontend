import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import Home from "@/pages/home/Home";
import Vote from "@/pages/vote/Vote";
import SignIn from "@/pages/auth/signIn/SignIn";
import SignUp from "@/pages/auth/signUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PageEndpoints.HOME} element={<Home />} />
        <Route path={PageEndpoints.SIGN_IN} element={<SignIn />} />
        <Route path={PageEndpoints.SIGN_UP} element={<SignUp />} />
        <Route path={PageEndpoints.VOTE} element={<Vote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
