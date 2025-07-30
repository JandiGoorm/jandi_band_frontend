import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./MyClubList.module.css";
import Loading from "@/components/loading/Loading";
import { useGetMyClubList } from "@/apis/club";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";
import CreateClubModal from "@/pages/home/CreateClubModal";
import Button from "@/components/button/Button";

const MyClubList = () => {
  const navigate = useNavigate();
  const { data: myClubListData, isLoading: isMyClubListLoading } =
    useGetMyClubList();

  if (!myClubListData || isMyClubListLoading) return <Loading />;

  console.log(myClubListData.data);
  return (
    <DefaultLayout>
      <header>
        <p className={styles.title}>내 동아리 목록</p>
      </header>
      <section className={styles.club_container}>
        {myClubListData.data.map((item) => (
          <div key={item.id} className={styles.club_card}>
            <div
              className={styles.image_wrapper}
              onClick={() =>
                navigate(buildPath(PageEndpoints.CLUB, { id: item.id }))
              }
            >
              <img
                src={item.photoUrl || "./basic_club.png"}
                alt={item.name}
                className={styles.club_image}
              />
              <div className={styles.overlay}>{item.name}</div>
            </div>
          </div>
        ))}
      </section>
      <div className={styles.add_button}>
        <CreateClubModal
          trigger={
            <Button
              variant="primary"
              size="md"
              className={styles.add_add_button}
            >
              동아리 만들기
            </Button>
          }
        />
      </div>
    </DefaultLayout>
  );
};

export default MyClubList;
