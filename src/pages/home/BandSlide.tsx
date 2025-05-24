import Button from "@/components/button/Button";
import styles from "./BandSlide.module.css";
import MainSlide from "@/components/slide/MainSlide";

const posterItems = [
  { id: 1, image: "promotion1.png" },
  { id: 2, image: "promotion2.png" },
  { id: 3, image: "promotion3.png" },
  { id: 4, image: "promotion1.png" },
  { id: 5, image: "promotion2.png" },
  { id: 6, image: "promotion2.png" },
];
const BandSlide = () => {
  return (
    <main className={styles.container}>
      <section className={styles.main_container}>
        <p className={styles.title}>당신의 귀를 사로잡을 밴드들이 여기에!</p>
        <MainSlide items={posterItems}>
          {(item) => <img src={item.image} style={{ margin: "0 auto" }} />}
        </MainSlide>
      </section>
      <section className={styles.centered}>
        <div className={styles.line_box}>
          <p className={styles.line_title}>
            모두가 기다리는 그 밴드, 바로 여러분일지도!
          </p>
          <Button variant="transparent" size="sm">
            동아리 만들기
          </Button>
        </div>
      </section>
    </main>
  );
};

export default BandSlide;
