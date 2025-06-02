import { FaRegHeart } from "react-icons/fa";
import styles from "./DetailContent.module.css";
import Button from "@/components/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { buildPath } from "@/utils/buildPath";
import { PageEndpoints } from "@/constants/endpoints";
import DeleteModal from "@/components/modal/deleteModal/DeleteModal";
import { useDeletePromo, useGetPromo } from "@/apis/promotion";
import Loading from "@/components/loading/Loading";
import {
  formatPromotionDate,
  formatDate,
  formatTime,
} from "@/utils/dateStatus";

const DetailContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: deletePromo } = useDeletePromo(id!);
  const { data: fetchData, isLoading: fetchLoading } = useGetPromo(id || "");

  console.log(fetchData);

  if (!id) return;

  if (!fetchData || fetchLoading) return <Loading />;

  return (
    <>
      <header className={styles.page_title}>
        <section>
          <span className={styles.promo_button}>공연 예정</span>
        </section>
        <div className={styles.title_box}>
          <p className={styles.promo_title}>{fetchData.data.title}</p>
          <div className={styles.title_button_box}>
            <Button
              size="sm"
              onClick={() =>
                navigate(buildPath(PageEndpoints.PROMOTION_UPDATE, { id }))
              }
            >
              수정
            </Button>
            <DeleteModal
              trigger={<Button size="sm">삭제</Button>}
              title="게시물 삭제"
              description="정말 해당 게시물을 삭제 하시겠어요?"
              onDelete={() => {
                deletePromo(undefined, {
                  onSuccess: () => {
                    navigate(PageEndpoints.PROMOTION);
                  },
                });
              }}
            />
          </div>
        </div>
        <section className={styles.basic_info}>
          <p>조회 {fetchData.data.viewCount}</p>
          <p>댓글 {fetchData.data.commentCount}</p>
          <p>좋아요 {fetchData.data.likeCount}</p>
          <p>작성일 {formatPromotionDate(fetchData.data.createdAt)}</p>
          <p>작성자 {fetchData.data.creatorName}</p>
        </section>
      </header>
      <section className={styles.promotion_container}>
        <section className={styles.promotion_info_box}>
          <img className={styles.promotion_img} src="/promotion1.png"></img>
          <section className={styles.promotion_info}>
            <section className={styles.promotion_like_box}>
              <p>이 공연을 응원하고 싶다면?</p>
              <Button variant="none" size="sm">
                <FaRegHeart size={14} style={{ marginRight: "0.25rem" }} />
                좋아요
              </Button>
            </section>
            <section className={styles.info_box}>
              <div className={styles.info}>
                <p className={styles.info_title}>공연팀</p>
                <p>{fetchData.data.teamName}</p>
              </div>
              <div className={styles.info}>
                <p className={styles.info_title}>관람료</p>
                <p>{fetchData.data.admissionFee}</p>
              </div>
              <div className={styles.info}>
                <p className={styles.info_title}>날짜</p>
                <p>{formatDate(fetchData.data.eventDatetime)}</p>
              </div>
              <div className={styles.info}>
                <p className={styles.info_title}>시간</p>
                <p>{formatTime(fetchData.data.eventDatetime)}</p>
              </div>
              <div className={styles.info}>
                <p className={styles.info_title}>장소</p>
                <p>{fetchData.data.location}</p>
                <Button size="sm" variant="transparent">
                  지도보기
                </Button>
              </div>
            </section>
          </section>
        </section>
        {fetchData.data.description !== "" && (
          <article className={styles.promo_content}>
            {fetchData.data.description}
          </article>
        )}
      </section>
    </>
  );
};

export default DetailContent;
