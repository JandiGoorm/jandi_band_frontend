import styles from "./Banner.module.css";
const Banner = () => {
  return (
    <main className={styles.container}>
      <img src="logo_anti.png" className={styles.back} />
      <div className={styles.title_box}>
        <p className={styles.title}>연습부터 무대까지,</p>
        <p className={styles.title}>밴드부를 위한 올인원 플랫폼</p>
      </div>
    </main>
  );
};

export default Banner;
