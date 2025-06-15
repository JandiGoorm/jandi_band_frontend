import Button from "@/components/button/Button";
import styles from "./BandSlide.module.css";
import MainSlide from "@/components/slide/MainSlide";
import type { ClubListResponse } from "@/types/club";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";
import CreateClubModal from "@/pages/home/CreateClubModal";

const BandSlide = ({ club }: { club: ClubListResponse[] }) => {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <section className={styles.main_container}>
        <p
          className={styles.title}
          onClick={() => navigate(PageEndpoints.CLUB_LIST)}
        >
          당신의 귀를 사로잡을 밴드들이 여기에!
        </p>
        <MainSlide<ClubListResponse> items={club}>
          {(item) => (
            <div className={styles.slide_item}>
              <div className={styles.band_image_wrapper}>
                <img
                  src={item.photoUrl || "./basic_club.png"}
                  className={styles.band_image}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (
                      target.src !==
                      window.location.origin + "/basic_club.png"
                    ) {
                      target.src = "./basic_club.png";
                    }
                  }}
                />
                <div
                  className={styles.overlay}
                  onClick={() =>
                    navigate(buildPath(PageEndpoints.CLUB, { id: item.id }))
                  }
                >
                  {item.name}
                </div>
              </div>
            </div>
          )}
        </MainSlide>
      </section>
      <section className={styles.centered}>
        <div className={styles.line_box}>
          <p className={styles.line_title}>
            모두가 기다리는 그 밴드, 바로 여러분일지도!
          </p>
          <CreateClubModal
            trigger={
              <Button variant="transparent" size="sm">
                동아리 만들기
              </Button>
            }
          />
        </div>
      </section>
    </main>
  );
};

export default BandSlide;
