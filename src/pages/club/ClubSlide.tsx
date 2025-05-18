import Button from "@/components/button/Button";
import styles from "./ClubSlide.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

const ClubSlide = () => {
  const [emblaRef, embla] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (!embla) return;
    // const handlePrev = () => embla.scrollPrev();
    // const handleNext = () => embla.scrollNext();

    // prevButtonRef.current?.addEventListener('click', handlePrev);
    // nextButtonRef.current?.addEventListener('click', handleNext);

    // return () => {
    //   prevButtonRef.current?.removeEventListener('click', handlePrev);
    //   nextButtonRef.current?.removeEventListener('click', handleNext);
    // };
  }, [embla]);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>곡 투표 목록</div>
        <Button variant="primary" size="md">
          투표 생성
        </Button>
      </header>
      <section className={styles.carouselWrapper} ref={emblaRef}>
        <div className={styles.carouselContainer}>
          {[...Array(15)].map((_, index) => (
            <div className={styles.slide} key={index}>
              <div className={styles.slideContent}>dd</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ClubSlide;
