import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./Home.module.css";
import Banner from "./Banner";

const Home = () => {
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <Banner />
      </main>
    </DefaultLayout>
  );
};

export default Home;
