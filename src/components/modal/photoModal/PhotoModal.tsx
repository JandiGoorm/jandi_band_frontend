import Button from "@/components/button/Button";
import Modal from "../Modal";
import styles from "./PhotoModal.module.css";
import type { PhotoResponse } from "@/types/photo";
import { useAuthStore } from "@/stores/authStore";
import DeleteModal from "../deleteModal/DeleteModal";
import { useDeletePhoto } from "@/apis/photo";
import { useParams } from "react-router-dom";

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
    }
  };

  return (
    <Modal trigger={trigger} title={title}>
      <div className={styles.container}>
        <img src={photo.imageUrl} className={styles.image} />
        <div className={styles.header_button}>
          {mine && (
            <DeleteModal
              trigger={<Button>삭제</Button>}
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
          <Button onClick={handleDownload}>다운로드</Button>
        </div>
      </div>
    </Modal>
  );
};

export default PhotoModal;
