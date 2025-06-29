import Button from "@/components/button/Button";
import styles from "./Slide.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

interface SlideProps<T> {
  items: T[];
  children: (item: T) => React.ReactNode;
  size?: "sm" | "md";
}
const Slide = <T extends { id: number }>({
  items,
  children,
  size = "sm",
}: SlideProps<T>) => {
  const sliderRef = useRef<Slider | null>(null);

  const [currentSlidesToShow, setCurrentSlidesToShow] = useState<number>(4); // 초기값

  const updateSlidesToShow = () => {
    const width = window.innerWidth;
    let slides = size === "sm" ? 4 : 3;

    if (width < 560) {
      slides = size === "sm" ? 2 : 1;
    } else if (width < 850) {
      slides = size === "sm" ? 2 : 2;
    } else if (width < 1110) {
      slides = size === "sm" ? 3 : 2;
    }

    setCurrentSlidesToShow(slides);
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, [size]);

  const commonSettings = {
    dots: false,
    arrows: false,
    slidesToShow: currentSlidesToShow,
    slidesToScroll: 1,
    infinite: false,
  };

  const isFullSlide = items.length > currentSlidesToShow;

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
