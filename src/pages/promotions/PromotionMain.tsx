import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./PromotionMain.module.css";
import Button from "@/components/button/Button";
import { useNavigate } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import Input from "@/components/input/Input";
import { useEffect, useRef, useState } from "react";
import usePagination from "@/hooks/usePagination";
import { useGetPromoList, useSearchPromotion } from "@/apis/promotion";
import Pagination from "@/components/pagination/Pagination";
import Loading from "@/components/loading/Loading";
import { formatPromotionDate, getEventStatus } from "@/utils/dateStatus";

const PromotionMain = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const { data: defaultPromoData, isLoading: defaultLoading } = useGetPromoList(
    {
      page: currentPage - 1,
      size: 10,
    }
  );

  const { data: searchData, isLoading: searchLoading } = useSearchPromotion({
    keyword: searchKeyword,
    page: currentPage - 1,
    size: 10,
  });

  const promoData = searchKeyword ? searchData : defaultPromoData;
  const isLoading = searchKeyword ? searchLoading : defaultLoading;

  useEffect(() => {
    if (promoData?.data.pageInfo.totalPages !== undefined) {
      setTotalPage(promoData.data.pageInfo.totalPages);
    }
  }, [promoData, setTotalPage]);

  if (!promoData || isLoading) return <Loading />;

  const handleSearch = () => {
    if (inputRef.current) {
      setSearchKeyword(inputRef.current.value);
    }
  };

  return (
    <DefaultLayout>
      <main className={styles.container}>
        <header className={styles.page_title}>동아리 공연 홍보 게시판</header>
        <nav className={styles.header_nav}>
          <Button
            size="md"
            variant="transparent"
            onClick={() => navigate(PageEndpoints.PROMOTION_MAP)}
          >
            지도보기
          </Button>
          <div>
            <Input
              inputSize="md"
              ref={inputRef}
              placeholder="제목, 장소로 검색"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button variant="transparent" size="md" onClick={handleSearch}>
              검색
            </Button>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate("/promotion/post")}
          >
            글 작성
          </Button>
        </nav>
        <section className={styles.promotion_container}>
          {promoData.data.content.map((item) => {
            const status = getEventStatus(item.eventDatetime);
            return (
              <article
                className={styles.promotion_box}
                key={item.id}
                onClick={() =>
                  navigate(
                    buildPath(PageEndpoints.PROMOTION_DETAIL, { id: item.id })
                  )
                }
              >
                <span
                  className={styles.promo_button}
                  style={{
                    backgroundColor: status.backgroundColor,
                    color: status.color,
                  }}
                >
                  {status.text}
                </span>
                <div>
                  <img
                    className={styles.promotion_img}
                    src={item.photoUrls[0]}
                    alt={item.title}
                  />
                </div>
                <p className={styles.promotion_title}>{item.title}</p>
                <p className={styles.promotion_sub}>
                  {formatPromotionDate(item.eventDatetime)}
                </p>
                <p className={styles.promotion_sub}>{item.location}</p>
              </article>
            );
          })}
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
