import styles from "./SignUpForm.module.css";
import PositionSelect from "@/pages/auth/signUp/PositionSelect";
import UniversitySelect from "./UniversitySelect";

const SignUpForm = () => {
  return (
    <form className={styles.form_container}>
      <div className={styles.form_group}>
        <label htmlFor="position" className={styles.label}>
          포지션
        </label>
        <PositionSelect />
        <p className={styles.error}>포지션을 입력하세요.</p>
      </div>

      <div className={styles.form_group}>
        <label htmlFor="university" className={styles.label}>
          소속대학
        </label>
        <UniversitySelect />
        <p className={styles.error}>소속대학을 입력하세요.</p>
      </div>

      <button type="submit" className={styles.button}>
        시작하기
      </button>
    </form>
  );
};

export default SignUpForm;
