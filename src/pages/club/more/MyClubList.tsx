import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./MyClubList.module.css";
import Loading from "@/components/loading/Loading";
import { useGetMyClubList } from "@/apis/club";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";

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
      <section className={styles.vote_container}>
        {myClubListData.data.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={item.photoUrl}
              alt={item.name}
              style={{
                maxWidth: "200px",
                height: "auto",
                maxHeight: "20rem",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(buildPath(PageEndpoints.CLUB, { id: item.id }))
              }
            />
          </div>
        ))}
      </section>
    </DefaultLayout>
  );
};

export default MyClubList;
