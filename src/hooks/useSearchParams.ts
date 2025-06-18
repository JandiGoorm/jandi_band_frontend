import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

const useSearchKeyword = (key: string = "keyword") => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get(key) ?? "";
  const status = searchParams.get("status") ?? "";

  const setKeyword = useCallback(
    (value: string) => {
      const newParams = new URLSearchParams(searchParams);
      if (value) {
        newParams.set(key, value);
        newParams.set("page", "1");
      } else {
        newParams.delete(key);
      }
      setSearchParams(newParams);
    },
    [key, searchParams, setSearchParams]
  );

  const setStatus = useCallback(
    (value: string) => {
      const newParams = new URLSearchParams(searchParams);
      if (value) {
        newParams.set("status", value);
        newParams.set("page", "1");
      } else {
        newParams.delete("status");
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  return { keyword, setKeyword, status, setStatus };
};

export default useSearchKeyword;
