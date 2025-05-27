import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import styles from "./Modal.module.css";
import close from "/public/modal_cancle.svg";

interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  children:
    | React.ReactNode
    | ((setOpen: (open: boolean) => void) => React.ReactNode);
}

const Modal: React.FC<ModalProps> = ({ trigger, title, children }) => {
  // 모달 자동으로 닫기 위한 state 추가
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialog_overlay} />
        <Dialog.Content
          className={styles.dialog_content}
          aria-describedby={undefined}
        >
          <Dialog.Title className={styles.dialog_title}>
            {title}
            <Dialog.Close className={styles.dialog_close}>
              <img src={close} alt="닫기" />
            </Dialog.Close>
          </Dialog.Title>
          <div className={styles.content_body}>
            {typeof children === "function" ? children(setOpen) : children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
