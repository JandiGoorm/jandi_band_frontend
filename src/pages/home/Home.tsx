import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./Home.module.css";
import Banner from "./Banner";
import BandSlide from "./BandSlide";
import MyBandSlide from "./MyBandSlide";
import PromotionSlide from "./PromotionSlide";

const Home = () => {
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
