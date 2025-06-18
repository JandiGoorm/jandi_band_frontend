import styles from "./PromotionSlide.module.css";
import MainSlide from "@/components/slide/MainSlide";
import type { PromotionListResponse } from "@/types/promotion";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";
import { useEffect, useState } from "react";

const PromotionSlide = ({ promo }: { promo: PromotionListResponse[] }) => {
  const navigate = useNavigate();

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className={styles.main_container}>
      <p
        className={styles.title}
        onClick={() => navigate(PageEndpoints.PROMOTION)}
      >
        현장을 달굴 밴드들의 무대,
        {width < 500 ? <br /> : " "}
        지금 바로 확인하세요!
      </p>
      <MainSlide<PromotionListResponse> items={promo}>
        {(item) => (
          <div className={styles.slide_item}>
            <div className={styles.promo_image_wrapper}>
              <img
                src={item.photoUrls[0]}
                className={styles.promo_image}
                alt="promo"
                onClick={() =>
                  navigate(
                    buildPath(PageEndpoints.PROMOTION_DETAIL, { id: item.id })
                  )
                }
              />
            </div>
            <section className={styles.promo_info}>
              <p className={styles.promo_title}>{item.title}</p>
              <p className={styles.promo_artist}>{item.teamName}</p>
            </section>
          </div>
        )}
      </MainSlide>
    </main>
  );
};

export default PromotionSlide;
