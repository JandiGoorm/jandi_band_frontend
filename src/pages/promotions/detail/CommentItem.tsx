import type { CommemtResponse } from "@/types/promotion";
import styles from "./CommentItem.module.css";
import { formatISO } from "@/utils/dateStatus";
import { useAuthStore } from "@/stores/authStore";
import DeleteModal from "@/components/modal/deleteModal/DeleteModal";
import { useDeleteComment, useReportPromotion } from "@/apis/promotion";
import ReportModal from "@/components/modal/reportModal/ReportModal";

const CommentItem = ({
  item,
  onDeleteSuccess,
}: {
  item: CommemtResponse;
  onDeleteSuccess: () => void;
}) => {
  const { user } = useAuthStore();
  const { mutate: deleteComment } = useDeleteComment(String(item.id) || "");
  const { mutate: reportComment } = useReportPromotion();

  const mine = user?.id === item.creatorId;

  return (
    <article className={styles.container} key={item.id}>
      <div className={styles.profileImg_box}>
        <img className={styles.profile} src={item.creatorProfilePhoto} />
      </div>
      <div className={styles.comment_box}>
        <header className={styles.comment_title}>
          <p className={styles.comment_name}>{item.creatorName}</p>
          <div className={styles.header_box}>
            {mine ? (
              <DeleteModal
                trigger={<p className={styles.comment_button}>삭제</p>}
                title="댓글 삭제"
                description="정말 해당 댓글을 삭제 하시겠어요?"
                onDelete={() => {
                  deleteComment(undefined, {
                    onSuccess: () => {
                      onDeleteSuccess();
                    },
                  });
                }}
              />
            ) : (
              <ReportModal
                trigger={<p className={styles.comment_button}>신고</p>}
                title="댓글 신고"
                description="신고 내역을 자세히 적어 제출해주세요!"
                onReport={(description, reasonId) => {
                  reportComment({
                    promoId: item.id,
                    reportReasonId: reasonId,
                    description,
                  });
                }}
              />
            )}
            <p className={styles.comment_time}>{formatISO(item.createdAt)}</p>
          </div>
        </header>
        <div>
          <p>{item.description}</p>
        </div>
      </div>
    </article>
  );
};

export default CommentItem;
