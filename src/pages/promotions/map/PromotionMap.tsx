import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./PromotionMap.module.css";
import Button from "@/components/button/Button";
import { useNavigate } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect } from "react";
import usePagination from "@/hooks/usePagination";
import { useGetPromoList } from "@/apis/promotion";
import Pagination from "@/components/pagination/Pagination";
import Loading from "@/components/loading/Loading";
import { formatPromotionDate, getEventStatus } from "@/utils/dateStatus";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const PromotionMap = () => {
  const navigate = useNavigate();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();
  const { data: promoData, isLoading: promoLoading } = useGetPromoList({
    page: currentPage - 1,
    size: 5,
  });

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
          <Button variant="transparent" size="md" onClick={() => navigate(-1)}>
            <FaArrowLeft size={20} />
          </Button>
        </nav>
        <section className={styles.map_box}>
          <Map
            center={{ lat: 37.5665, lng: 126.978 }} // 서울시청 기준
            style={{ width: "100%", height: "100%", borderRadius: "12px" }}
            level={5}
          >
            <MapMarker position={{ lat: 37.5665, lng: 126.978 }}>
              <div style={{ padding: "5px", fontSize: "12px" }}>
                서울 공연장
              </div>
            </MapMarker>
          </Map>
        </section>
        <section className={styles.promotion_container}>
          <p className={styles.page_title}>지도 내 공연 목록</p>
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
              <div className={styles.text_box}>
                <div className={styles.title_box}>
                  <p>{getEventStatus(item.eventDatetime).text}</p>
                  <p>{item.title}</p>
                </div>
                <div className={styles.sub_title_box}>
                  <p>{formatPromotionDate(item.eventDatetime)}</p>
                  <p>{item.location}</p>
                  <p>{item.admissionFee}원</p>
                </div>
                <div className={styles.description_box}>
                  <p>{item.description}</p>
                </div>
              </div>
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

export default PromotionMap;
