import { useCallback, useEffect, useMemo } from "react";
import styles from "./Pagination.module.css";
import Button from "../button/Button";

const distance = (a: number, b: number) => Math.abs(a - b);

const START_PAGE = 1;

interface PaginationProps {
  callback: (page: number) => void;
  currentPage: number;
  totalPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  callback,
  currentPage,
  totalPage,
}) => {
  const safetyCurrentPage = useMemo(() => {
    return Math.min(Math.max(currentPage, START_PAGE), totalPage);
  }, [currentPage, totalPage]);

  const handlePrevPage = useCallback(() => {
    callback(Math.max(safetyCurrentPage - 1, 1));
  }, [callback, safetyCurrentPage]);

  const handleNextPage = useCallback(() => {
    callback(Math.min(safetyCurrentPage + 1, totalPage));
  }, [callback, safetyCurrentPage, totalPage]);

  const handlePageChange = useCallback(
    (num: number) => {
      callback(num);
    },
    [callback]
  );

  const pageRange = useMemo(() => {
    const range: number[] = [];
    if (safetyCurrentPage > 2) {
      range.push(safetyCurrentPage - 1);
    }
    if (safetyCurrentPage !== START_PAGE && safetyCurrentPage !== totalPage) {
      range.push(safetyCurrentPage);
    }
    if (safetyCurrentPage < totalPage - 1) {
      range.push(safetyCurrentPage + 1);
    }
    return range;
  }, [safetyCurrentPage, totalPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <Button
        variant="none"
        size="sm"
        onClick={handlePrevPage}
        disabled={safetyCurrentPage === 1}
      >
        이전
      </Button>
      <Button
        size="sm"
        variant={safetyCurrentPage === 1 ? "secondary" : "none"}
        onClick={() => handlePageChange(1)}
        disabled={safetyCurrentPage === 1}
      >
        1
      </Button>
      {distance(safetyCurrentPage, START_PAGE) >= 3 && <span>...</span>}
      {pageRange.map((page) => (
        <Button
          size="sm"
          key={page}
          variant={safetyCurrentPage === page ? "secondary" : "none"}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}
      {distance(safetyCurrentPage, totalPage) >= 3 && <span>...</span>}
      {totalPage > 1 && (
        <Button
          variant={safetyCurrentPage === totalPage ? "secondary" : "none"}
          onClick={() => handlePageChange(totalPage)}
          disabled={safetyCurrentPage === totalPage}
        >
          {totalPage}
        </Button>
      )}
      <Button
        variant="none"
        size="sm"
        onClick={handleNextPage}
        disabled={safetyCurrentPage === totalPage}
      >
        다음
      </Button>
    </div>
  );
};

export default Pagination;
