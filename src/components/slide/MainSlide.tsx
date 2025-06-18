import styles from "./MainSlide.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";

interface SlideProps<T> {
  items: T[];
  children: (item: T) => React.ReactNode;
}

const MainSlide = <T extends { id: number }>({
  items,
  children,
}: SlideProps<T>) => {
  const sliderRef = useRef<Slider | null>(null);
  const [current, setCurrent] = useState(0);

  const settings = {
    // dots: true,
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: (_: number, next: number) => setCurrent(next),
    // responsive: [
    //   {
    //     breakpoint: 550,
    //     settings: {
    //       slidesToShow: 1,
    //       autoplay: true,
    //       autoplaySpeed: 2000,
    //     },
    //   },
    // ],
  };
  const minSettings = {
    dots: false,
    // dots: true,
    infinite: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: (_: number, next: number) => setCurrent(next),
  };
  const oneSlideSettings = {
    dots: false,
    // dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    swipeToSlide: false,
    autoplay: false,
  };

  let appliedSettings;

  if (items.length > 5) {
    appliedSettings = settings;
  } else if (items.length === 1) {
    appliedSettings = oneSlideSettings;
  } else {
    appliedSettings = minSettings;
  }

  return (
    <div className={styles.container}>
      <section className={styles.slider_box}>
        <Slider ref={sliderRef} {...appliedSettings} className={styles.slider}>
          {items.map((item, index) => {
            let className = styles.slide_item;
            const len = items.length;
            const diff = (index - current + len) % len;

            if (index === current) {
              className += ` ${styles.center}`;
            } else if (diff === 1 || diff === len - 1) {
              className += ` ${styles.side1}`;
            } else if (diff === 2 || diff === len - 2) {
              className += ` ${styles.side2}`;
            }

            return (
              <div key={item.id} className={className}>
                {children(item)}
              </div>
            );
          })}
        </Slider>

        <div
          className={styles.progressBar}
          onClick={(e) => {
            const bar = e.currentTarget;
            const clickX = e.clientX - bar.getBoundingClientRect().left;
            const ratio = clickX / bar.clientWidth;
            const nextIndex = Math.floor(ratio * items.length);
            sliderRef.current?.slickGoTo(nextIndex);
            setCurrent(nextIndex);
          }}
        >
          <div
            className={styles.progressFill}
            style={{
              width: `${((current + 1) / items.length) * 100}%`,
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default MainSlide;
