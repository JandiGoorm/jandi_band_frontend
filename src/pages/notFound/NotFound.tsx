import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import Button from "@/components/button/Button";
import { PageEndpoints } from "@/constants/endpoints";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.form_wrapper}>
        <h1 className={styles.title}>404 :(</h1>
        <p className={styles.message}>찾을 수 없는 페이지입니다.</p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate(PageEndpoints.HOME)}
          className={styles.button}
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
