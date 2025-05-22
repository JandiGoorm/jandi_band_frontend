import { useGetClubList } from "@/apis/club";
import { useGetPromoList } from "@/apis/promotion";
import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";

const Home = () => {
  const { data: clubListData, isSuccess: isClubListSuccess } = useGetClubList();
  const { data: promoListData, isSuccess: isPromoListSuccess } =
    useGetPromoList();

  console.log(clubListData?.data.content);
  console.log(isClubListSuccess);
  console.log(promoListData?.data.content);
  console.log(isPromoListSuccess);

  return (
    <DefaultLayout>
      <p>test</p>
    </DefaultLayout>
  );
};

export default Home;
