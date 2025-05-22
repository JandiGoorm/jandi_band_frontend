import styles from "./MyBandSlide.module.css";
import MainSlide from "@/components/slide/MainSlide";

const posterItems = [
  { id: 1, image: "promotion1.png" },
  { id: 2, image: "promotion2.png" },
  { id: 3, image: "promotion3.png" },
  { id: 4, image: "promotion1.png" },
  { id: 5, image: "promotion2.png" },
  { id: 6, image: "promotion2.png" },
];
const MyBandSlide = () => {
  return (
    <main className={styles.container}>
      <section className={styles.main_container}>
        <p className={styles.title}>당신의 귀를 사로잡을 밴드들이 여기에!</p>
        <MainSlide items={posterItems}>
          {(item) => (
            <img
              src={item.image}
              alt="promotion"
              style={{ width: "100%", borderRadius: "12px" }}
            />
          )}
        </MainSlide>
      </section>
    </main>
  );
};

export default MyBandSlide;
