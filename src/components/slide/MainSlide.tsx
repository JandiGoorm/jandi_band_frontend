import styles from "./MainSlide.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface SlideItem {
  id: number;
  image: string;
}

interface MainSlideProps {
  items: SlideItem[];
  children: (item: SlideItem) => React.ReactNode;
  loop?: boolean;
}

const MainSlide = ({ items, children, loop = true }: MainSlideProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    align: "center",
    containScroll: "trimSnaps",
  });

  const [slideOffsets, setSlideOffsets] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  const updateSlideOffsets = useCallback(() => {
    if (!emblaApi) return;

    const selectedSnap = emblaApi.selectedScrollSnap();
    const totalSlides = items.length;

    const offsets = items.map((_, index) => {
      let offset = index - selectedSnap;

      if (loop) {
        const half = totalSlides / 2;
        if (offset > half) offset -= totalSlides;
        if (offset < -half) offset += totalSlides;
      }

      return offset;
    });

    setSlideOffsets(offsets);
  }, [emblaApi, items, loop]);

  useEffect(() => {
    if (!emblaApi) return;
    updateSlideOffsets();
    emblaApi.on("select", updateSlideOffsets);
    emblaApi.on("reInit", updateSlideOffsets);
  }, [emblaApi, updateSlideOffsets]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla_viewport} ref={emblaRef}>
        <div className={styles.embla_container}>
          {items.map((item, index) => {
            const offset = Math.abs(
              slideOffsets[index % slideOffsets.length] ?? 999
            );
            const scale = 1 - offset * 0.1;
            const opacity = 1 - offset * 0.3;
            const zIndex = 10 - offset;

            return (
              <div
                key={item.id}
                className={styles.embla_slide}
                style={{ zIndex }}
              >
                <div
                  className={`${styles.embla_slide_img} ${mounted ? styles.animate : ""}`}
                  style={{
                    transform: `scale(${scale})`,
                    opacity,
                  }}
                >
                  {children(item)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainSlide;
