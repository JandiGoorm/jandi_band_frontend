import styles from "./SignUp.module.css";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <img src="/logo.png" alt="logo" className={styles.logo} />

        <div className={styles.form_wrapper}>
          <header className={styles.form_header}>
            <h3>첫 방문 이시군요!</h3>
            <p>가입을 위해 소속과 포지션을 입력해주세요.</p>
          </header>

          <SignUpForm />
        </div>
      </section>
    </main>
  );
};

export default SignUp;
