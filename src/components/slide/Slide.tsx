import Button from "@/components/button/Button";
import styles from "./Slide.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useRef } from "react";

interface SlideItem {
  id: number;
  name: string;
}
interface SlideProps {
  items: SlideItem[];
  children: (item: SlideItem) => React.ReactNode;
  size?: "sm" | "md";
}
const Slide = ({ items, children, size = "sm" }: SlideProps) => {
  const sliderRef = useRef<Slider | null>(null);

  const baseSlidesToShow = size === "sm" ? 4 : 3;

  const commonSettings = {
    dots: false,
    arrows: false,
    slidesToShow: baseSlidesToShow,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 1110,
        settings: {
          slidesToShow: size === "sm" ? 3 : 2,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: size === "sm" ? 2 : 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const isFullSlide = items.length > baseSlidesToShow;

  return (
    <main className={styles.container}>
      <section className={styles.slider_box}>
        {isFullSlide && (
          <Button
            variant="none"
            size="sm"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <FaCaretLeft
              size={40}
              style={{ color: "var(--color-button-primary-bg)" }}
            />
          </Button>
        )}

        <div className={styles.slider_back}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.line}></div>
          ))}
        </div>
        {items.length > 0 ? (
          <Slider ref={sliderRef} {...commonSettings} className={styles.slider}>
            {items.map((item, index) => (
              <div
                key={index}
                className={`${styles.slide_item} ${
                  size === "sm" ? styles.sm_slide_item : styles.md_slide_item
                }`}
              >
                {item.id < 0 ? null : children(item)}
              </div>
            ))}
          </Slider>
        ) : (
          <Slider ref={sliderRef} {...commonSettings} className={styles.slider}>
            <div
              className={`${styles.slide_item} ${
                size === "sm" ? styles.sm_slide_item : styles.md_slide_item
              }`}
            ></div>
          </Slider>
        )}

        {isFullSlide && (
          <Button
            variant="none"
            size="sm"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <FaCaretRight
              size={40}
              style={{ color: "var(--color-button-primary-bg)" }}
            />
          </Button>
        )}
      </section>
    </main>
  );
};

export default Slide;
