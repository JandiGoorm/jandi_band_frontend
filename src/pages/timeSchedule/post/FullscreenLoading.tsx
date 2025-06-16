import styles from "./FullscreenLoading.module.css";

const FullscreenLoading = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner} />
      <p className={styles.text}>
        {" "}
        시간표를 불러오는 중입니다. <br /> 잠시만 기다려주세요...
      </p>
    </div>
  );
};

export default FullscreenLoading;
