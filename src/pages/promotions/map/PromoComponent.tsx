import type { PromotionListResponse } from "@/types/promotion";
import styles from "./PromotionComponent.module.css";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";
import { formatPromotionDate, getEventStatus } from "@/utils/dateStatus";

const PromoComponent = ({ item }: { item: PromotionListResponse }) => {
  const navigate = useNavigate();
  const status = getEventStatus(item.eventDatetime);
  return (
    <article
      className={styles.promotion_box}
      key={item.id}
      onClick={() =>
        navigate(buildPath(PageEndpoints.PROMOTION_DETAIL, { id: item.id }))
      }
    >
      <img className={styles.promotion_img} src={item.photoUrls[0]} />
      <div className={styles.text_box}>
        <div className={styles.title_box}>
          <span
            className={styles.promo_button}
            style={{
              backgroundColor: status.backgroundColor,
              color: status.color,
            }}
          >
            {status.text}
          </span>
          <p className={styles.title}>{item.title}</p>
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
  );
};

export default PromoComponent;
