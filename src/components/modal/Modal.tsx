import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import styles from "./Modal.module.css";
import close from "/public/modal_cancle.svg";

interface ModalProps {
  trigger?: React.ReactNode; // optional 처리
  title: string;
  children:
    | React.ReactNode
    | ((setOpen: (open: boolean) => void) => React.ReactNode);
  open?: boolean; // 외부에서 제어 가능
  onOpenChange?: (open: boolean) => void; // 외부 제어용 콜백
}

const Modal: React.FC<ModalProps> = ({
  trigger,
  title,
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled ? controlledOnOpenChange! : setUncontrolledOpen;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
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
