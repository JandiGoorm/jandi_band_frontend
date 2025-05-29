import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const usePagination = (name: string = "page") => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [totalPage, setTotalPage] = useState<number>(1);

  const handlePageChange = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set(name, page.toString());
        return newParams;
      });
    },
    [name, setSearchParams]
  );

  const currentPageParam = searchParams.get(name);
  const currentPage = currentPageParam ? parseInt(currentPageParam, 10) : 1;

  return {
    currentPage,
    totalPage,
    setTotalPage,
    handlePageChange,
  };
};

export default usePagination;
