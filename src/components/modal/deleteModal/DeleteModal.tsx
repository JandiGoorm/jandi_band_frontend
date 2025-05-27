import Button from "@/components/button/Button";
import Modal from "../Modal";
import styles from "./DeleteModal.module.css";
import * as Dialog from "@radix-ui/react-dialog";

interface DeleteModalProps {
  trigger: React.ReactNode;
  title: string;
  onDelete: () => void;
  description?: string;
}

const DeleteModal = ({
  trigger,
  title,
  onDelete,
  description,
}: DeleteModalProps) => {
  return (
    <Modal trigger={trigger} title={title}>
      <div className={styles.container}>
        <p className={styles.description}>{description}</p>

        <div className={styles.button_container}>
          <Dialog.Close asChild>
            <Button type="button" variant="secondary">
              취소
            </Button>
          </Dialog.Close>

          <Dialog.Close asChild>
            <Button type="button" variant="secondary" onClick={onDelete}>
              삭제
            </Button>
          </Dialog.Close>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
