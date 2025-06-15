import type { MyClubListResponse } from "@/types/club";
import styles from "./MyBandSlide.module.css";
import MainSlide from "@/components/slide/MainSlide";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";

const MyBandSlide = ({ club }: { club: MyClubListResponse[] }) => {
  const navigate = useNavigate();

  if (!club || club.length === 0) return null;

  return (
    <main className={styles.main_container}>
      <p
        className={styles.title}
        onClick={() => navigate(PageEndpoints.MY_CLUB_LIST)}
      >
        내가 함께하는 밴드
      </p>
      <MainSlide<MyClubListResponse> items={club}>
        {(item) => (
          <div className={styles.band_item}>
            <div className={styles.band_image_wrapper}>
              <img
                src={item.photoUrl || "./basic_club.png"}
                className={styles.band_image}
                onClick={() =>
                  navigate(buildPath(PageEndpoints.CLUB, { id: item.id }))
                }
              />
            </div>
          </div>
        )}
      </MainSlide>
    </main>
  );
};

export default MyBandSlide;
