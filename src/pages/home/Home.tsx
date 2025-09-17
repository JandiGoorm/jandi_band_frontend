import { useGetPromoList } from "@/apis/promotion";
import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./Home.module.css";
import Banner from "./Banner";
import BandSlide from "./BandSlide";
import MyBandSlide from "./MyBandSlide";
import PromotionSlide from "./PromotionSlide";
import { useGetClubList, useGetMyClubList } from "@/apis/club";
import Loading from "@/components/loading/Loading";
import { motion } from "framer-motion";
import BannerLine from "./BannerLine";
import { useNoticeInfo } from "@/apis/notice";
// import PopUp from "./noticePopUp/PopUp";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const { data: promoListData, isLoading: isPromoListLoading } =
    useGetPromoList({ size: 10 });
  const { data: myClubListData, isLoading: isMyClubListLoading } =
    useGetMyClubList();
  const { data: clubListData, isLoading: isClubListLoading } = useGetClubList({
    size: 10,
  });
  const { data: noticeData, isLoading: isNoticeLoading } = useNoticeInfo();

  if (
    !myClubListData ||
    isMyClubListLoading ||
    !promoListData ||
    isPromoListLoading ||
    !clubListData ||
    isClubListLoading ||
    !noticeData ||
    isNoticeLoading
  )
    return <Loading />;

  return (
    <div className={styles.fullBackground}>
      {/* {noticeData?.data && <PopUp notices={noticeData.data} />} */}
      <DefaultLayout>
        <main className={styles.container}>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Banner />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <MyBandSlide club={myClubListData.data} />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <BandSlide club={clubListData.data.content} />
          </motion.div>

          <BannerLine />

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <PromotionSlide promo={promoListData.data.content} />
          </motion.div>
        </main>
      </DefaultLayout>
    </div>
  );
};

export default Home;
