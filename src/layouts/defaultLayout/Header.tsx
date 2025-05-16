import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={"/logo_anti.png"} alt="logo" className={styles.logo} />
      </div>
    </div>
  );
};

export default Header;
