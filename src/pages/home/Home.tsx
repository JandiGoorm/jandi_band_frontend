import { useGetPromoList } from "@/apis/promotion";
import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./Home.module.css";
import Banner from "./Banner";
import BandSlide from "./BandSlide";
import MyBandSlide from "./MyBandSlide";
import PromotionSlide from "./PromotionSlide";
import { useGetMyClubList } from "@/apis/club";
import Loading from "@/components/loading/Loading";

const Home = () => {
  const { data: promoListData, isLoading: isPromoListLoading } =
    useGetPromoList();
  const { data: myClubListData, isLoading: isMyClubListLoading } =
    useGetMyClubList();

  console.log(promoListData?.data.content);
  console.log(myClubListData?.data);

  if (
    !myClubListData ||
    isMyClubListLoading ||
    !promoListData ||
    isPromoListLoading
  )
    return <Loading />;

  return (
    <div className={styles.fullBackground}>
      <DefaultLayout>
        <main className={styles.container}>
          <Banner />
          <MyBandSlide club={myClubListData.data} />
          <BandSlide />
          <PromotionSlide />
        </main>
      </DefaultLayout>
    </div>
  );
};

export default Home;
