import { FaRegHeart } from "react-icons/fa";
import styles from "./DetailContent.module.css";
import Button from "@/components/button/Button";

const DetailContent = () => {
  return (
    <>
      <header className={styles.page_title}>
        <section>
          <span className={styles.promo_button}>공연 예정</span>
        </section>
        <p className={styles.promo_title}>뫄 동아리 8월 정기 공연</p>
        <section className={styles.basic_info}>
          <p>조회 20</p>
          <p>댓글 20</p>
          <p>좋아요 20</p>
          <p>작성일 20</p>
          <p>작성자 20</p>
        </section>
      </header>
      <section className={styles.promotion_container}>
        <section className={styles.promotion_info_box}>
          <img className={styles.promotion_img} src="/promotion1.png"></img>
          <section className={styles.promotion_info}>
            <section className={styles.promotion_like_box}>
              <p>이 공연을 응원하고 싶다면?</p>
              <Button variant="none" size="sm">
                <FaRegHeart size={14} style={{ marginRight: "0.25rem" }} />
                좋아요
              </Button>
            </section>
            <section className={styles.info_box}>
              <div className={styles.info}>
                <p className={styles.info_title}>공연팀</p>
                <p>아이유팀</p>
              </div>
              <div className={styles.info}>
                <p className={styles.info_title}>관람료</p>
                <p>5000원</p>
              </div>
              <div className={styles.info}>
                <p className={styles.info_title}>날짜</p>
                <p>2025년 3월 17일 월요일</p>
              </div>
              <div className={styles.info}>
                <p className={styles.info_title}>시간</p>
                <p>PM 6:00</p>
              </div>
              <div className={styles.info}>
                <p className={styles.info_title}>장소</p>
                <p>뫄뫄 공연장</p>
                <Button size="sm" variant="transparent">
                  지도보기
                </Button>
              </div>
            </section>
          </section>
        </section>
        <article className={styles.promo_content}>
          안녕하세요 00대학교 동아리 아이유팀에서 70번째 정기 공연을 하게
          되었습니다. 부원들이 열심히 준비한 무대이니 많은 관심 부탁드립니다.
        </article>
      </section>
    </>
  );
};

export default DetailContent;
