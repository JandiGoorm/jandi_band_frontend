import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./PromotionDetail.module.css";

import Comment from "./Comment";
import DetailContent from "./DetailContent";

const PromotionDetail = () => {
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <DetailContent />
        <Comment />
      </main>
    </DefaultLayout>
  );
};

export default PromotionDetail;
