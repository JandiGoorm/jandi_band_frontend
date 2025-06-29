import Button from "@/components/button/Button";
import Modal from "../Modal";
import styles from "./PhotoModal.module.css";
import type { PhotoResponse } from "@/types/photo";
import { useAuthStore } from "@/stores/authStore";
import DeleteModal from "../deleteModal/DeleteModal";
import { useDeletePhoto } from "@/apis/photo";
import { useParams } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import { useToastStore } from "@/stores/toastStore";

interface PhotoModalProps {
  trigger: React.ReactNode;
  title: string;
  photo: PhotoResponse;
  description?: string;
  refetch: () => void;
}

const PhotoModal = ({ trigger, title, photo, refetch }: PhotoModalProps) => {
  const { user } = useAuthStore();
  const { id } = useParams();
  const { showToast } = useToastStore();
  const { mutate: deletePhoto } = useDeletePhoto(id || "", photo.photoId);

  const mine = user?.id === photo.uploaderId;
  const handleDownload = async () => {
    try {
      const response = await fetch(photo.imageUrl, { mode: "cors" });
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "photo.jpg";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("다운로드 실패:", error);
      showToast(
        "error",
        "사진 다운로드에 실패했습니다.",
        "photo-download-error"
      );
    }
  };

  return (
    <Modal trigger={trigger} title={title}>
      <div className={styles.container}>
        <img src={photo.imageUrl} className={styles.image} />
        <div className={styles.header_button}>
          {mine && (
            <DeleteModal
              trigger={
                <Button variant="transparent" className={styles.delete}>
                  삭제
                </Button>
              }
              title="사진삭제"
              description="정말 해당 사진을 삭제 하시겠어요?"
              onDelete={() => {
                deletePhoto(undefined, {
                  onSuccess: () => {
                    close();
                    refetch();
                  },
                });
              }}
            />
          )}
        </div>
        <Button
          variant="primary"
          onClick={handleDownload}
          className={styles.download}
        >
          <IoMdDownload size={20} />
        </Button>
      </div>
    </Modal>
  );
};

export default PhotoModal;
