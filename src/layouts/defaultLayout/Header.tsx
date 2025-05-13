import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={"/logo.png"} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Header;
