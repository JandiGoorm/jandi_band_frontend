import styles from "./SignUpForm.module.css";

const SignUpForm = () => {
  return (
    <form className={styles.form_container}>
      <div className={styles.form_group}>
        <label htmlFor="position" className={styles.label}>
          포지션
        </label>
        <input type="text" id="position" className={styles.input} />
      </div>

      <div className={styles.form_group}>
        <label htmlFor="university" className={styles.label}>
          소속대학
        </label>
        <input type="text" id="university" className={styles.input} />
      </div>

      <button type="submit" className={styles.button}>
        시작하기
      </button>
    </form>
  );
};

export default SignUpForm;
