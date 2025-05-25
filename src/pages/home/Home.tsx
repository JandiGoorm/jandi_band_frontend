import { useGetClubList } from "@/apis/club";
import { useGetPromoList } from "@/apis/promotion";
import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./Home.module.css";
import Banner from "./Banner";
import BandSlide from "./BandSlide";
import MyBandSlide from "./MyBandSlide";
import PromotionSlide from "./PromotionSlide";

const Home = () => {
  const { data: clubListData, isSuccess: isClubListSuccess } = useGetClubList();
  const { data: promoListData, isSuccess: isPromoListSuccess } =
    useGetPromoList();

  console.log(clubListData?.data.content);
  console.log(isClubListSuccess);
  console.log(promoListData?.data.content);
  console.log(isPromoListSuccess);

  return (
    <div className={styles.fullBackground}>
      <DefaultLayout>
        <main className={styles.container}>
          <Banner />
          <MyBandSlide />
          <BandSlide />
          <PromotionSlide />
        </main>
      </DefaultLayout>
    </div>
  );
};

export default Home;
