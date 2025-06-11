import Button from "@/components/button/Button";
import Modal from "../Modal";
import styles from "./PhotoModal.module.css";
import type { PhotoResponse } from "@/types/photo";

interface PhotoModalProps {
  trigger: React.ReactNode;
  title: string;
  photo: PhotoResponse;
  description?: string;
}

const PhotoModal = ({ trigger, title, photo }: PhotoModalProps) => {
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
          <Button onClick={handleDownload}>다운로드</Button>
        </div>
      </div>
    </Modal>
  );
};

export default PhotoModal;
