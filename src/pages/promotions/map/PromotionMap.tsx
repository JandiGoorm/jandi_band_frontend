import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./PromotionMap.module.css";
import Button from "@/components/button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import usePagination from "@/hooks/usePagination";
import { useGetPromoMap } from "@/apis/promotion";
import Pagination from "@/components/pagination/Pagination";
import Loading from "@/components/loading/Loading";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import PromoComponent from "./PromoComponent";
import { formatPromotionDate } from "@/utils/dateStatus";

import ArrowBack from "@/pages/vote/style/arrowback.svg";

const PromotionMap = () => {
  const navigate = useNavigate();
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [level, setLevel] = useState(9);

  const [bounds, setBounds] = useState({
    swLat: 37,
    swLng: 126,
    neLat: 38,
    neLng: 127,
  });
  const [searchBounds, setSearchBounds] = useState(bounds);
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();
  const { data: promoData, isLoading: promoLoading } = useGetPromoMap({
    startLatitude: searchBounds.swLat,
    startLongitude: searchBounds.swLng,
    endLatitude: searchBounds.neLat,
    endLongitude: searchBounds.neLng,
    page: currentPage - 1,
    size: 8,
  });
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const initBounds = map.getBounds();
    const sw = initBounds.getSouthWest();
    const ne = initBounds.getNorthEast();

    const initialBounds = {
      swLat: sw.getLat(),
      swLng: sw.getLng(),
      neLat: ne.getLat(),
      neLng: ne.getLng(),
    };

    setBounds(initialBounds);
    setSearchBounds(initialBounds);
  }, []);

  useEffect(() => {
    if (promoData?.data.pageInfo.totalPages !== undefined) {
      setTotalPage(promoData.data.pageInfo.totalPages);
    }
  }, [promoData, setTotalPage]);

  const handleBoundsChange = () => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const newBounds = map.getBounds();
    const sw = newBounds.getSouthWest();
    const ne = newBounds.getNorthEast();

    setBounds({
      swLat: sw.getLat(),
      swLng: sw.getLng(),
      neLat: ne.getLat(),
      neLng: ne.getLng(),
    });
    const center = map.getCenter();
    setCenter({ lat: center.getLat(), lng: center.getLng() });
    setLevel(map.getLevel());
  };

  const handleSearchClick = () => {
    setSearchBounds(bounds);
  };

  if (!promoData || promoLoading) return <Loading />;
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <nav className={styles.header_nav}>
          <img
            src={ArrowBack}
            alt="뒤로가기"
            onClick={() => navigate(-1)}
            className={styles.back_button}
          />
        </nav>
        <section className={styles.map_box}>
          <Map
            center={center}
            level={level}
            style={{ width: "100%", height: "100%", borderRadius: "12px" }}
            onBoundsChanged={handleBoundsChange}
            ref={mapRef}
          >
            {promoData.data.content.map((item) => (
              <MapMarker
                key={item.id}
                position={{ lat: item.latitude, lng: item.longitude }}
                onClick={() =>
                  setSelectedMarkerId((prev) =>
                    prev === item.id ? null : item.id
                  )
                }
              />
            ))}

            {promoData.data.content.map((item) =>
              selectedMarkerId === item.id ? (
                <CustomOverlayMap
                  key={`info-${item.id}`}
                  position={{ lat: item.latitude, lng: item.longitude }}
                  yAnchor={1.5}
                >
                  <div className={styles.overlay_box}>
                    <p className={styles.overlay_title}>{item.title}</p>
                    <p>{item.location}</p>
                    <p>{formatPromotionDate(item.eventDatetime)}</p>
                  </div>
                </CustomOverlayMap>
              ) : null
            )}
          </Map>
          <Button
            className={styles.search_button}
            size="md"
            variant="secondary"
            onClick={handleSearchClick}
          >
            현 지도에서 검색
          </Button>
        </section>
        <section className={styles.promotion_container}>
          <p className={styles.page_title}>지도 내 공연 목록</p>
          {promoData.data.content.map((item) => (
            <PromoComponent item={item} key={item.id} />
          ))}
        </section>
        <section className={styles.page_navigate_box}>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            callback={handlePageChange}
          />
        </section>
        <section className={styles.post_button_box}>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/promotion/post")}
          >
            홍보물 등록
          </Button>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default PromotionMap;
