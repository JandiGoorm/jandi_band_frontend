import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToastStore } from "@/stores/toastStore";

const ErrorRedirectHandler = () => {
  const errorOccurred = useToastStore((state) => state.errorOccurred);
  const setErrorOccurred = useToastStore((state) => state.setErrorOccurred);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorOccurred) {
      const timer = setTimeout(() => {
        setErrorOccurred(false);
        navigate(-1);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorOccurred, navigate, setErrorOccurred]);

  return null;
};

export default ErrorRedirectHandler;
