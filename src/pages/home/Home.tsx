import { useGetPromoList } from "@/apis/promotion";
import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./Home.module.css";
import Banner from "./Banner";
import BandSlide from "./BandSlide";
import MyBandSlide from "./MyBandSlide";
import PromotionSlide from "./PromotionSlide";
import { useGetMyClubList } from "@/apis/club";
import Loading from "@/components/loading/Loading";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

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
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <BandSlide />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <PromotionSlide />
          </motion.div>
        </main>
      </DefaultLayout>
    </div>
  );
};

export default Home;
