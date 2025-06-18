import CreateClubModal from "@/pages/home/CreateClubModal";
import Button from "@/components/button/Button";
import styles from "./BannerLine.module.css";

export default function BannerLine() {
  return (
    <section className={styles.banner_section}>
      <div className={styles.line_box}>
        <p className={styles.line_title}>
          모두가 기다리는 그 밴드, 바로 여러분일지도!
        </p>
        <CreateClubModal
          trigger={
            <Button variant="transparent" size="sm" className={styles.button}>
              동아리 만들기
            </Button>
          }
        />
      </div>
    </section>
  );
}
