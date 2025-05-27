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
      <p className={styles.title}>내가 함께하는 밴드</p>
      <MainSlide<MyClubListResponse> items={club}>
        {(item) => (
          <img
            src={item.photoUrl}
            style={{ margin: "0 auto" }}
            onClick={() =>
              navigate(buildPath(PageEndpoints.CLUB, { id: item.id }))
            }
          />
        )}
      </MainSlide>
    </main>
  );
};

export default MyBandSlide;
