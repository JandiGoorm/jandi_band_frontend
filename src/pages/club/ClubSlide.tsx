import Button from "@/components/button/Button";
import styles from "./ClubSlide.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useRef } from "react";

interface ClubSlideProps {
  title: string;
  buttonName: string;
}
const ClubSlide = ({ title, buttonName }: ClubSlideProps) => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>{title}</div>
        <Button variant="primary" size="md">
          {buttonName}
        </Button>
      </header>
      <section className={styles.slider_box}>
        <Button
          variant="none"
          size="sm"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <FaCaretLeft
            size={32}
            style={{ color: "var(--color-button-primary-bg)" }}
          />
        </Button>
        <div className={styles.slider_back}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.line}></div>
          ))}
        </div>
        <Slider ref={sliderRef} {...settings} className={styles.slider}>
          <div className={styles.slide_item}>Slide 1</div>
          <div className={styles.slide_item}>Slide 2</div>
          <div className={styles.slide_item}>Slide 3</div>
          <div className={styles.slide_item}>Slide 4</div>
        </Slider>
        <Button
          variant="none"
          size="sm"
          onClick={() => sliderRef.current?.slickNext()}
        >
          <FaCaretRight
            size={32}
            style={{ color: "var(--color-button-primary-bg)" }}
          />
        </Button>
      </section>
    </main>
  );
};

export default ClubSlide;
