import styles from "./PromotionSlide.module.css";
import MainSlide from "@/components/slide/MainSlide";
import type { PromotionListResponse } from "@/types/promotion";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";

const PromotionSlide = ({ promo }: { promo: PromotionListResponse[] }) => {
  const navigate = useNavigate();

  return (
    <main className={styles.main_container}>
      <p
        className={styles.title}
        onClick={() => navigate(PageEndpoints.PROMOTION)}
      >
        현장을 달굴 밴드들의 무대, 지금 바로 확인하세요!
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
          </div>
        )}
      </MainSlide>
    </main>
  );
};

export default PromotionSlide;
