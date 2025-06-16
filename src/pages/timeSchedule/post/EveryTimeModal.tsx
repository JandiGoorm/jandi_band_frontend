import { useState } from "react";
import styles from "./EveryTimeModal.module.css";

export default function EveryTimeModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className={styles.container}>
      <p className={styles.guide}>
        에브리타임 시간표를 불러올 수 있어요.
        <br />
      </p>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.toggleBtn}
      >
        {isOpen ? "가이드 닫기 ▲" : "가이드 보기 ▼"}
      </button>

      {isOpen && (
        <div className={styles.imageWrapper}>
          <img
            src="/guide/everytime_guide.png"
            alt="에브리타임 사용 가이드"
            className={styles.guideImage}
          />
        </div>
      )}
    </main>
  );
}
