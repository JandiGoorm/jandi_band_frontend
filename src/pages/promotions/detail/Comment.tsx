import Input from "@/components/input/Input";
import styles from "./Comment.module.css";
import Button from "@/components/button/Button";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetComment, usePostComment } from "@/apis/promotion";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/pagination/Pagination";
import Loading from "@/components/loading/Loading";
import CommentItem from "./CommentItem";
const Comment = () => {
  const { id } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: postComment } = usePostComment(id || "");
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();
  const {
    data: commentData,
    isLoading: commentLoading,
    refetch: refetchComments,
  } = useGetComment({
    id: id || "",
    page: currentPage - 1,
    size: 5,
  });

  useEffect(() => {
    if (commentData?.data.pageInfo.totalPages !== undefined) {
      setTotalPage(commentData.data.pageInfo.totalPages);
    }
  }, [commentData, setTotalPage]);

  if (!id) return;

  const handleAddComment = () => {
    const value = inputRef.current?.value.trim();
    if (!value) return;

    postComment(
      { description: value },
      {
        onSuccess: () => {
          if (inputRef.current) {
            inputRef.current.value = "";
          }
          refetchComments();
        },
      }
    );
  };

  const handleDeleteSuccess = () => {
    // const { totalElements } = commentData!.data.pageInfo;
    const contentLength = commentData!.data.content.length;

    const isLastItemOnPage = contentLength === 1;
    const isNotFirstPage = currentPage > 1;

    if (isLastItemOnPage && isNotFirstPage) {
      handlePageChange(currentPage - 1);
    } else {
      refetchComments();
    }
  };

  if (!commentData || commentLoading) return <Loading />;
  return (
    <section className={styles.comment_container}>
      <header className={styles.comment_header}>
        댓글 {commentData.data.pageInfo.totalElements}개
      </header>
      <section className={styles.comment_input}>
        <Input
          inputSize="lg"
          style={{ flex: "1", marginRight: "0.3rem" }}
          ref={inputRef}
        />
        <Button size="md" onClick={handleAddComment}>
          작성
        </Button>
      </section>
      <section className={styles.comment_container}>
        {commentData.data.content.map((item) => (
          <CommentItem
            key={item.id}
            item={item}
            onDeleteSuccess={handleDeleteSuccess}
          />
        ))}
      </section>
      <section className={styles.page_navigate_box}>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          callback={handlePageChange}
        />
      </section>
    </section>
  );
};

export default Comment;
