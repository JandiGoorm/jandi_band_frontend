import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./PromotionMain.module.css";
import Button from "@/components/button/Button";
import { promotionItems } from "./constants";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";

const PromotionMain = () => {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <nav className={styles.header_nav}>
          <Button variant="transparent"> 지도보기 </Button>
          <Button variant="transparent"> 지역별 </Button>
          <Button variant="transparent"> 날짜선택 </Button>
          <input className={styles.input}></input>
          <Button variant="transparent"> + </Button>
        </nav>
        <header className={styles.page_title}>동아리 공연 홍보 게시판</header>
        <section className={styles.promotion_container}>
          {promotionItems.map((item) => (
            <article
              className={styles.promotion_box}
              key={item.id}
              onClick={() =>
                navigate(
                  buildPath(PageEndpoints.PROMOTION_DETAIL, { id: item.id })
                )
              }
            >
              <img className={styles.promotion_img} src={item.img} />
              <p className={styles.promotion_title}>{item.title}</p>
              <p className={styles.promotion_sub}>{item.time}</p>
              <p className={styles.promotion_sub}>{item.destination}</p>
            </article>
          ))}
        </section>
        <section className={styles.page_navigate_box}>
          <Button size="sm" variant="none">
            <MdNavigateBefore
              size={"1rem"}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </Button>
          <Button size="sm" variant="none">
            1
          </Button>
          <Button size="sm" variant="none">
            2
          </Button>
          <Button size="sm" variant="none">
            3
          </Button>
          <Button size="sm" variant="none">
            4
          </Button>
          <Button size="sm" variant="none">
            5
          </Button>
          <Button size="sm" variant="none">
            <MdNavigateNext
              size={"1rem"}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </Button>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default PromotionMain;
