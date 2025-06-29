import { FaRegHeart, FaHeart } from "react-icons/fa";
import styles from "./DetailContent.module.css";
import Button from "@/components/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { buildPath } from "@/utils/buildPath";
import { ApiEndpotins, PageEndpoints } from "@/constants/endpoints";
import DeleteModal from "@/components/modal/deleteModal/DeleteModal";
import {
  useDeletePromo,
  useGetPromo,
  usePromoisLike,
  usePromoLike,
  useReportPromotion,
} from "@/apis/promotion";
import Loading from "@/components/loading/Loading";
import {
  formatPromotionDate,
  formatDate,
  formatTime,
  getEventStatus,
} from "@/utils/dateStatus";
import { useAuthStore } from "@/stores/authStore";
import { queryClient } from "@/config/queryClient";
import Modal from "@/components/modal/Modal";
import LocationModal from "./LocationModal";
import ReportModal from "@/components/modal/reportModal/ReportModal";

const DetailContent = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { mutate: deletePromo } = useDeletePromo(id!);
  const { data: fetchData, isLoading: fetchLoading } = useGetPromo(id || "");
  const { data: likeData, isLoading: likeLoading } = usePromoisLike(id || "");
  const { mutate: likePromo } = usePromoLike(id || "");
  const { mutate: reportPromo } = useReportPromotion();

  if (!id) return;

  if (!fetchData || fetchLoading || likeLoading || !likeData)
    return <Loading />;

  const mine = user?.id === fetchData?.data.creatorId;
  const status = getEventStatus(fetchData.data.eventDatetime);

  const handleLike = () => {
    likePromo(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [buildPath(ApiEndpotins.PROMOTION_ISLIKE, { id })],
        });
        queryClient.invalidateQueries({
          queryKey: [buildPath(ApiEndpotins.PROMOTION_DETAIL, { id })],
        });
      },
    });
  };

  return (
    <>
      <header className={styles.page_title}>
        <section>
          <span
            className={styles.promo_button}
            style={{
              backgroundColor: status.backgroundColor,
              color: status.color,
            }}
          >
            {status.text}
          </span>
        </section>
        <div className={styles.title_box}>
          <p className={styles.promo_title}>{fetchData.data.title}</p>
          {mine ? (
            <div className={styles.title_button_box}>
              <Button
                size="sm"
                variant="transparent"
                onClick={() =>
                  navigate(buildPath(PageEndpoints.PROMOTION_UPDATE, { id }))
                }
              >
                수정
              </Button>
              <DeleteModal
                trigger={
                  <Button size="sm" variant="transparent">
                    삭제
                  </Button>
                }
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
          ) : (
            <div className={styles.title_button_box}>
              <ReportModal
                trigger={
                  <Button size="sm" variant="transparent">
                    신고
                  </Button>
                }
                title="게시물 신고"
                description="신고 내역을 자세히 적어 제출해주세요!"
                onReport={(description, reasonId) => {
                  reportPromo({
                    promoId: parseInt(id),
                    reportReasonId: reasonId,
                    description,
                  });
                }}
              />
            </div>
          )}
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
          <img
            className={styles.promotion_img}
            src={fetchData.data.photoUrls[0]}
          ></img>
          <section className={styles.promotion_info}>
            <section className={styles.promotion_like_box}>
              <p>이 공연을 응원하고 싶다면?</p>
              <Button variant="none" size="sm" onClick={handleLike}>
                {likeData.data ? (
                  <div className={styles.heart}>
                    <FaHeart size={17} style={{ marginRight: "0.25rem" }} />
                    <span>좋아요</span>
                  </div>
                ) : (
                  <div className={styles.heart}>
                    <FaRegHeart size={17} style={{ marginRight: "0.25rem" }} />
                    <span>좋아요</span>
                  </div>
                )}
              </Button>
            </section>
            <section className={styles.info_box}>
              <div className={styles.info}>
                <p className={styles.info_title}>공연팀</p>
                <p className={styles.info_text}>{fetchData.data.teamName}</p>
              </div>
              <div className={styles.info}>
                <p className={styles.info_title}>관람료</p>
                <p className={styles.info_text}>
                  {Number(fetchData.data.admissionFee).toLocaleString("ko-KR")}{" "}
                  원
                </p>
              </div>
              <div className={styles.info}>
                <p className={styles.info_title}>날짜</p>
                <p className={styles.info_text}>
                  {formatDate(fetchData.data.eventDatetime)}
                </p>
              </div>
              <div className={styles.info}>
                <p className={styles.info_title}>시간</p>
                <p className={styles.info_text}>
                  {formatTime(fetchData.data.eventDatetime)}
                </p>
              </div>
              <div className={styles.info}>
                <p className={styles.info_title}>장소</p>
                <div className={styles.location_box}>
                  <p className={styles.info_text}>{fetchData.data.location}</p>
                  <p className={styles.address}>({fetchData.data.address})</p>
                  <Modal
                    title="장소 위치 보기"
                    trigger={
                      <Button size="sm" variant="transparent">
                        지도보기
                      </Button>
                    }
                  >
                    <LocationModal data={fetchData.data} />
                  </Modal>
                </div>
              </div>
            </section>
          </section>
        </section>
        {fetchData.data.description !== null &&
          fetchData.data.description !== "" && (
            <article className={styles.promo_content}>
              {fetchData.data.description}
            </article>
          )}
      </section>
    </>
  );
};

export default DetailContent;
