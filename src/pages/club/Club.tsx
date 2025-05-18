import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./Club.module.css";
import ClubInfo from "./ClubInfo";

const Club = () => {
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <ClubInfo />
      </main>
    </DefaultLayout>
  );
};

export default Club;
