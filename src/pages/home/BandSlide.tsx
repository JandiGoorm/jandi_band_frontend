import Button from "@/components/button/Button";
import styles from "./BandSlide.module.css";
import MainSlide from "@/components/slide/MainSlide";
import { useGetClubList } from "@/apis/club";

const BandSlide = () => {
  const { data: clubListData } = useGetClubList();
  const items = clubListData?.data.content;
  if (!items) return;
  return (
    <main className={styles.container}>
      <section className={styles.main_container}>
        <p className={styles.title}>당신의 귀를 사로잡을 밴드들이 여기에!</p>
        <MainSlide items={items}>
          {(item) => (
            <img
              src={item.photoUrl || "promotion3.png"}
              style={{ margin: "0 auto" }}
            />
          )}
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
