import { useGetMe } from "@/apis/auth";
import SignIn from "@/pages/auth/signIn/SignIn";
import Home from "@/pages/home/Home";

const HomeRouter = () => {
  const { data: user, isLoading: isLoading } = useGetMe();

  if (isLoading) return;

  return user ? <Home /> : <SignIn />;
};

export default HomeRouter;
