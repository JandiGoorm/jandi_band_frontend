import { useLogin } from "@/apis/auth";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Callback = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const { refetch } = useLogin({
    code,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return <div>Loading ...</div>;
};

export default Callback;
