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
        현장을 달굴 밴드들의 무대, 지금 바로 확인!
      </p>
      <MainSlide<PromotionListResponse> items={promo}>
        {(item) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={item.photoUrls[0]}
              style={{
                maxWidth: "200px",
              }}
              alt="promo"
              onClick={() =>
                navigate(
                  buildPath(PageEndpoints.PROMOTION_DETAIL, { id: item.id })
                )
              }
            />
          </div>
        )}
      </MainSlide>
    </main>
  );
};

export default PromotionSlide;
