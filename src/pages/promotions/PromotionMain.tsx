import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./PromotionMain.module.css";
import Button from "@/components/button/Button";
import { useNavigate } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import Input from "@/components/input/Input";
import { useEffect, useState } from "react";
import usePagination from "@/hooks/usePagination";
import { useGetPromoList } from "@/apis/promotion";
import Pagination from "@/components/pagination/Pagination";
import Loading from "@/components/loading/Loading";
import { formatPromotionDate } from "@/utils/dateStatus";

const regions = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "울산",
  "경기",
  "강원",
];

const PromotionMain = () => {
  const navigate = useNavigate();
  const [showRegions, setShowRegions] = useState(false);
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();
  const { data: promoData, isLoading: promoLoading } = useGetPromoList({
    page: currentPage - 1,
    size: 20,
  });
  const toggleRegions = () => {
    setShowRegions((prev) => !prev);
  };

  useEffect(() => {
    if (promoData?.data.pageInfo.totalPages !== undefined) {
      setTotalPage(promoData.data.pageInfo.totalPages);
    }
  }, [promoData, setTotalPage]);

  if (!promoData || promoLoading) return <Loading />;
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <nav className={styles.header_nav}>
          <div>
            <Button variant="transparent"> 지도보기 </Button>
            <Button
              variant="transparent"
              onClick={toggleRegions}
              isClicked={showRegions}
            >
              지역별
            </Button>
            <Button variant="transparent"> 날짜선택 </Button>
          </div>
          <div>
            <Input inputSize="md" style={{ width: "100%" }} />
            <Button
              variant="transparent"
              onClick={() => navigate("/promotion/post")}
            >
              {" "}
              +{" "}
            </Button>
          </div>
        </nav>
        {showRegions && (
          <nav className={styles.region_buttons}>
            {regions.map((region) => (
              <Button key={region} variant="transparent">
                {region}
              </Button>
            ))}
          </nav>
        )}
        <header className={styles.page_title}>동아리 공연 홍보 게시판</header>
        <section className={styles.promotion_container}>
          {promoData.data.content.map((item) => (
            <article
              className={styles.promotion_box}
              key={item.id}
              onClick={() =>
                navigate(
                  buildPath(PageEndpoints.PROMOTION_DETAIL, { id: item.id })
                )
              }
            >
              <div>
                <img className={styles.promotion_img} src={item.photoUrls[0]} />
              </div>
              <p className={styles.promotion_title}>{item.title}</p>
              <p className={styles.promotion_sub}>
                {formatPromotionDate(item.eventDatetime)}
              </p>
              <p className={styles.promotion_sub}>{item.location}</p>
            </article>
          ))}
        </section>
        <section className={styles.page_navigate_box}>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            callback={handlePageChange}
          />
        </section>
      </main>
    </DefaultLayout>
  );
};

export default PromotionMain;
