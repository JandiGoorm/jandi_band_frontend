import * as Dialog from "@radix-ui/react-dialog";
import styles from "./Modal.module.css";

interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ trigger, title, children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialog_overlay} />
        <Dialog.Content className={styles.dialog_content}>
          <Dialog.Title className={styles.dialog_title}>
            {title}
            <Dialog.Close className={styles.dialog_close}>X</Dialog.Close>
          </Dialog.Title>
          <div className={styles.content_body}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
