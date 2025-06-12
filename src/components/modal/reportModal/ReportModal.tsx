import Button from "@/components/button/Button";
import Modal from "../Modal";
import styles from "./ReportModal.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { useRef } from "react";

interface DeleteModalProps {
  trigger: React.ReactNode;
  title: string;
  onReport: (description: string) => void;
  description?: string;
}

const ReportModal = ({
  trigger,
  title,
  onReport,
  description,
}: DeleteModalProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleReport = () => {
    const value = textareaRef.current?.value.trim();
    if (value) {
      onReport(value);
    }
  };

  return (
    <Modal trigger={trigger} title={title}>
      <div className={styles.container}>
        <p className={styles.description}>{description}</p>

        <textarea
          className={styles.report_box}
          placeholder="신고 내용을 입력하세요."
          ref={textareaRef}
        />

        <div className={styles.button_container}>
          <Dialog.Close asChild>
            <Button type="button" variant="secondary">
              취소
            </Button>
          </Dialog.Close>

          <Dialog.Close asChild>
            <Button type="button" variant="secondary" onClick={handleReport}>
              신고
            </Button>
          </Dialog.Close>
        </div>
      </div>
    </Modal>
  );
};

export default ReportModal;
