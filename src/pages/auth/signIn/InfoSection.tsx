import styles from "./InfoSection.module.css";
import { useEffect, useState } from "react";

interface Section {
  title: string;
  desc: string;
  images: string[];
  features: string[];
}

const sections: Section[] = [
  {
    title: "당신만의 밴드를 \n 시작해보세요.",
    desc: "나만의 밴드 동아리를 쉽고 빠르게 만들어보세요. \n 일정 관리 부터 곡 선정까지, 한곳에서 손쉽게 관리할 수 있어요.",
    images: [
      "/landingImg/band1.png",
      "/landingImg/band2.png",
      "/landingImg/band3.png",
    ],
    features: [
      "간편한 동아리 생성 및 설정",
      "카카오톡 연동으로 편리한 멤버 초대!",
      "공용 캘린더를 통한 활동 계획 및 일정 관리",
      "추억을 담은 우리만의 사진 갤러리",
    ],
  },
  {
    title: "일정 잡기 힘드셨죠? \n 이제는 되는 시간만 모아보세요.",
    desc: "팀원들의 가능한 시간을 토대로 효율적인 합주 일정을 찾아보아요. \n 연습 일정 등록까지 한번에!",
    images: ["/landingImg/band4.png", "/landingImg/band5.png"],
    features: [
      "에브리타임 연동을 통한 간편한 시간표 등록",
      "멤버별, 포지션별 가능 시간 자동 조회 및 필터링",
      "카카오톡 연동으로 편리하게 초대해요~",
    ],
  },
  {
    title: "공연을 빛내는 시작,\n 홍보부터 제대로.",
    desc: "동아리의 공연과 이벤트를 효과적으로 홍보하세요.\n 주변 공연 조회까지 쉽게 가능해요!",
    images: ["/landingImg/band6.png", "/landingImg/band7.png"],
    features: [
      "공연 정보 게시 및 관리",
      "지도를 통한 주변 공연 정보 찾기",
      "공연뿐만 아니라 관람도 손쉽게!",
    ],
  },
];

const InfoSection = () => {
  const [currentImages, setCurrentImages] = useState<number[]>(
    sections.map(() => 0)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages((prev) =>
        prev.map((val, i) => (val + 1) % sections[i].images.length)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 스크롤 애니메이션
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(`.${styles.serviceSection}`);
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;

      for (const section of sections) {
        if (section instanceof HTMLElement) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollTop + windowHeight > sectionTop + sectionHeight * 0.3) {
            section.classList.add(styles.animate);
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 50) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 1 : -1;
        window.scrollTo({
          top: window.pageYOffset + window.innerHeight * delta,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className={styles.servicesContainer}>
      {sections.map((s, idx) => {
        const currentImage = currentImages[idx];

        return (
          <section className={styles.serviceSection} key={idx}>
            <div
              className={`${styles.serviceContent} ${
                idx % 2 === 1 ? styles.reverse : ""
              }`}
            >
              <div className={styles.serviceText}>
                <h2 className={styles.serviceTitle}>
                  {s.title.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h2>
                <p className={styles.serviceDescription}>
                  {s.desc.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
                <ul className={styles.serviceFeatures}>
                  {s.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.phone_wrappe}>
                <div
                  className={`${styles.phone_mockup} ${
                    idx % 2 === 0 ? styles.tiltLeft : styles.tiltRight
                  }`}
                >
                  <div className={styles.phone_screen}>
                    {s.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`슬라이드 ${i}`}
                        className={`${styles.fadeImage} ${i === currentImage ? styles.visible : ""}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default InfoSection;
