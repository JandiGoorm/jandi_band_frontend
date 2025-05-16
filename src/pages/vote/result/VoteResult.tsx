import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import ArrowBack from "@/pages/vote/style/arrowback.svg";
import styles from "@/pages/vote/style/VoteResult.module.css";

const VoteResult = () => {
  return (
    <DefaultLayout>
      <main className={styles.vote_result_container}>
        <header className={styles.header}>
          <section className={styles.vote_title}>
            <img src={ArrowBack} alt="뒤로가기" />
            <h1>5월 대동제 곡 투표 결과</h1>
          </section>
          <section>뻐튼</section>
        </header>
      </main>
    </DefaultLayout>
  );
};

export default VoteResult;
