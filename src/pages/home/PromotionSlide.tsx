import { useGetPromoList } from "@/apis/promotion";
import styles from "./PromotionSlide.module.css";
import MainSlide from "@/components/slide/MainSlide";

const posterItems = [
  { id: 1, image: "promotion1.png" },
  { id: 2, image: "promotion2.png" },
  { id: 3, image: "promotion3.png" },
  { id: 4, image: "promotion1.png" },
  { id: 5, image: "promotion2.png" },
  { id: 6, image: "promotion2.png" },
];
const PromotionSlide = () => {
  const { data: promoListData } = useGetPromoList();
  const items = promoListData?.data.content;
  console.log(items);
  return (
    <main className={styles.main_container}>
      <p className={styles.title}>현장을 달굴 밴드들의 무대, 지금 바로 확인!</p>
      <MainSlide items={posterItems}>
        {(item) => <img src={item.image} style={{ margin: "0 auto" }} />}
      </MainSlide>
    </main>
  );
};

export default PromotionSlide;
