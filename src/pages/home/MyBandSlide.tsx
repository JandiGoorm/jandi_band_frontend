import type { MyClubListResponse } from "@/types/club";
import styles from "./MyBandSlide.module.css";
import MainSlide from "@/components/slide/MainSlide";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";

const MyBandSlide = ({ club }: { club: MyClubListResponse[] }) => {
  const navigate = useNavigate();
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={item.photoUrl || "./basic_club.png"}
              style={{ maxWidth: "200px", height: "auto", maxHeight: "20rem" }}
              onClick={() =>
                navigate(buildPath(PageEndpoints.CLUB, { id: item.id }))
              }
            />
          </div>
        )}
      </MainSlide>
    </main>
  );
};

export default MyBandSlide;
