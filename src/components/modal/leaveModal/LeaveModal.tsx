import Button from "@/components/button/Button";
import Modal from "../Modal";
import styles from "./LeaveModal.module.css";
import * as Dialog from "@radix-ui/react-dialog";

interface LeaveModalProps {
  trigger: React.ReactNode;
  title: string;
  onLeave: () => void;
  description?: string;
}

const LeaveModal = ({
  trigger,
  title,
  onLeave,
  description,
}: LeaveModalProps) => {
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
            <Button type="button" variant="secondary" onClick={onLeave}>
              나가기
            </Button>
          </Dialog.Close>
        </div>
      </div>
    </Modal>
  );
};

export default LeaveModal;
