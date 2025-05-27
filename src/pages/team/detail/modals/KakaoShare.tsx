import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import styles from "./KakaoShare.module.css";

const KakaoShare = () => {
  return (
    <Modal
      trigger={
        <Button className={styles.kakao_share_button} variant="kakao">
          <img src="/kakao_icon.png" alt="kakao" />
          <span>공유하기</span>
        </Button>
      }
      title="카카오톡 공유하기"
    >
      <section className={styles.kakao_share_link}>
        {/* <span className={styles.kakao_share_link_text}>{team?.link}</span> */}
        <Button variant="secondary" className={styles.kakao_share_link_button}>
          복사하기
        </Button>
      </section>
    </Modal>
  );
};

export default KakaoShare;
