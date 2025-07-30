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
import CreateClubModal from "@/pages/home/CreateClubModal";
import Button from "@/components/button/Button";

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
        <p className={styles.title}>전체 동아리 목록</p>
      </header>

      <section className={styles.club_container}>
        {clubData.data.content.map((item) => (
          <div key={item.id} className={styles.club_card}>
            <div
              className={styles.image_wrapper}
              onClick={() =>
                navigate(buildPath(PageEndpoints.CLUB, { id: item.id }))
              }
            >
              <img
                src={item.photoUrl || "./basic_club.png"}
                alt={item.name}
                className={styles.club_image}
              />
              <div className={styles.overlay}>{item.name}</div>
            </div>
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
      <div className={styles.add_button}>
        <CreateClubModal
          trigger={
            <Button
              variant="primary"
              size="md"
              className={styles.add_add_button}
            >
              동아리 만들기
            </Button>
          }
        />
      </div>
    </DefaultLayout>
  );
};

export default ClubList;
