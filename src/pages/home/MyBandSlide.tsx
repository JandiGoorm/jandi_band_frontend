import type { MyClubListResponse } from "@/types/club";
import styles from "./MyBandSlide.module.css";
import MainSlide from "@/components/slide/MainSlide";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";

import CreateClubModal from "@/pages/home/CreateClubModal";
import Button from "@/components/button/Button";

const MyBandSlide = ({ club }: { club: MyClubListResponse[] }) => {
  const navigate = useNavigate();

  if (!club) return null;

  return (
    <main className={styles.main_container}>
      <p
        className={styles.title}
        onClick={() => navigate(PageEndpoints.MY_CLUB_LIST)}
      >
        내가 함께하는 밴드
      </p>

      {club.length === 0 ? (
        <div>
          <p className={styles.empty_message}>
            현재 가입한 밴드가 없습니다. <br />
            직접 동아리를 만들어 부원을 모집해봐요!
          </p>
          <CreateClubModal
            trigger={
              <Button variant="transparent" size="sm">
                동아리 만들기
              </Button>
            }
          />
        </div>
      ) : (
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
      )}
    </main>
  );
};

export default MyBandSlide;
