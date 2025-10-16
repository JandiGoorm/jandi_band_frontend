import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./VoteList.module.css";
import { useParams } from "react-router-dom";
import { useGetClubPoll } from "@/apis/poll";
import Loading from "@/components/loading/Loading";
import Pagination from "@/components/pagination/Pagination";
import usePagination from "@/hooks/usePagination";
import { useEffect } from "react";
import VoteCard from "@/components/cards/VoteCard";

const VoteList = () => {
  const { id } = useParams();

  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();
  const { data: pollData, isLoading: pollLoading } = useGetClubPoll({
    id: id as string,
    page: currentPage - 1,
    size: 12,
  });

  // console.log(pollData);

  useEffect(() => {
    if (pollData?.data.pageInfo.totalPages !== undefined) {
      setTotalPage(pollData.data.pageInfo.totalPages);
    }
  }, [pollData, setTotalPage]);

  if (!pollData || pollLoading) return <Loading />;
  return (
    <DefaultLayout>
      <header>
        <p className={styles.title}>곡 투표 목록</p>
      </header>
      <section className={styles.vote_container}>
        {pollData.data.content.map((item) => (
          <VoteCard item={item} key={item.id} />
        ))}
      </section>
      <section className={styles.pagination_box}>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          callback={handlePageChange}
        />
      </section>
    </DefaultLayout>
  );
};

export default VoteList;
