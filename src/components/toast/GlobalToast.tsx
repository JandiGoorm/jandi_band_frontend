import * as Toast from "@radix-ui/react-toast";
import { useToastStore } from "@/stores/toastStore";
import styles from "./GlobalToast.module.css";
import clsx from "clsx";
import { FaCheckCircle } from "react-icons/fa";

const titleMap = {
  pending: "요청 처리중",
  success: "요청 성공!",
  error: "요청 오류!",
};

const styleMap = {
  pending: styles.pending,
  success: styles.success,
  error: styles.error,
};

const GlobalToast = () => {
  const { open, status, message, hideToast } = useToastStore();

  return (
    <Toast.Provider swipeDirection="right" duration={3000}>
      <Toast.Root
        open={open}
        onOpenChange={hideToast}
        className={clsx(styles.container, styleMap[status])}
      >
        <Toast.Title className={styles.title}>
          {status === "pending" ? (
            <div className={styles.loader} />
          ) : (
            <FaCheckCircle className={clsx(styles.icon, styleMap[status])} />
          )}
          <p>{titleMap[status]}</p>
        </Toast.Title>
        <Toast.Description>{message}</Toast.Description>
      </Toast.Root>

      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  );
};

export default GlobalToast;
