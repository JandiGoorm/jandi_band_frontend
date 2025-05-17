import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./PromotionMain.module.css";
import Button from "@/components/button/Button";
import { promotionItems } from "./constants";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import Input from "@/components/input/Input";
import { useState } from "react";

const regions = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "울산",
  "경기",
  "강원",
];

const PromotionMain = () => {
  const navigate = useNavigate();
  const [showRegions, setShowRegions] = useState(false);

  const toggleRegions = () => {
    setShowRegions((prev) => !prev);
  };

  return (
    <DefaultLayout>
      <main className={styles.container}>
        <nav className={styles.header_nav}>
          <Button variant="transparent"> 지도보기 </Button>
          <Button
            variant="transparent"
            onClick={toggleRegions}
            isClicked={showRegions}
          >
            지역별
          </Button>
          <Button variant="transparent"> 날짜선택 </Button>
          <Input inputSize="md" style={{ width: "30%" }} />
          <Button variant="transparent"> + </Button>
        </nav>
        {showRegions && (
          <nav className={styles.region_buttons}>
            {regions.map((region) => (
              <Button key={region} variant="transparent">
                {region}
              </Button>
            ))}
          </nav>
        )}
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
