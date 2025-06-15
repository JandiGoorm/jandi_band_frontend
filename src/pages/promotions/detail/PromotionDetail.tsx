import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./PromotionDetail.module.css";

import Comment from "./Comment";
import DetailContent from "./DetailContent";
import Button from "@/components/button/Button";
import { useNavigate } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";

const PromotionDetail = () => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <main className={styles.container}>
        <DetailContent />
        <Comment />
        <div className={styles.list_button}>
          <Button
            onClick={() => {
              navigate(PageEndpoints.PROMOTION);
            }}
          >
            목록으로
          </Button>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default PromotionDetail;
