import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./ClubList.module.css";
import Loading from "@/components/loading/Loading";
import Pagination from "@/components/pagination/Pagination";
import usePagination from "@/hooks/usePagination";
import { useEffect } from "react";
import { useGetClubList } from "@/apis/club";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";

const ClubList = () => {
  const navigate = useNavigate();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();
  const { data: clubData, isLoading: clubLoading } = useGetClubList({
    page: currentPage - 1,
    size: 12,
  });

  console.log(clubData);

  useEffect(() => {
    if (clubData?.data.pageInfo.totalPages !== undefined) {
      setTotalPage(clubData.data.pageInfo.totalPages);
    }
  }, [clubData, setTotalPage]);

  if (!clubData || clubLoading) return <Loading />;
  return (
    <DefaultLayout>
      <header>
        <p className={styles.title}>동아리 목록</p>
      </header>
      <section className={styles.club_container}>
        {clubData.data.content.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={item.photoUrl || "./basic_club.png"}
              alt={item.name}
              style={{
                width: "220px",
                aspectRatio: "5/3",
                cursor: "pointer",
                borderRadius: "var(--radius-xl)",
              }}
              onClick={() =>
                navigate(buildPath(PageEndpoints.CLUB, { id: item.id }))
              }
            />
          </div>
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

export default ClubList;
